-- ==============================================================================
-- SalesGency Revenue Velocity & Rep Conversion Telemetry SQL Queries
-- Designed for Metabase, Supabase, PostgreSQL, and BigQuery
-- ==============================================================================

-- 1. STAGE-BY-STAGE PIPELINE VELOCITY (DAYS IN STAGE)
SELECT 
    d.deal_stage,
    COUNT(d.id) AS total_deals,
    ROUND(AVG(EXTRACT(DAY FROM (COALESCE(d.stage_exited_at, NOW()) - d.stage_entered_at))), 1) AS avg_days_in_stage,
    ROUND(PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY EXTRACT(DAY FROM (COALESCE(d.stage_exited_at, NOW()) - d.stage_entered_at))), 1) AS median_days_in_stage,
    SUM(d.amount) AS total_pipeline_value
FROM hubspot_deal_stage_history d
WHERE d.created_at >= NOW() - INTERVAL '90 days'
GROUP BY d.deal_stage
ORDER BY avg_days_in_stage DESC;

-- 2. REP WIN-RATE & SPEED-TO-CLOSE CONVERSION
SELECT 
    u.name AS rep_name,
    COUNT(d.id) AS total_opportunities,
    COUNT(CASE WHEN d.stage = 'closedwon' THEN 1 END) AS won_deals,
    ROUND(
        (COUNT(CASE WHEN d.stage = 'closedwon' THEN 1.0 END) / NULLIF(COUNT(d.id), 0)) * 100, 
        1
    ) AS win_rate_percentage,
    ROUND(
        AVG(CASE WHEN d.stage = 'closedwon' THEN EXTRACT(DAY FROM (d.closed_date - d.created_at)) END), 
        1
    ) AS avg_sales_cycle_days,
    SUM(CASE WHEN d.stage = 'closedwon' THEN d.amount ELSE 0 END) AS total_arr_closed
FROM hubspot_deals d
JOIN hubspot_users u ON d.owner_id = u.id
WHERE d.closed_date >= NOW() - INTERVAL '180 days'
GROUP BY u.name
ORDER BY total_arr_closed DESC;

-- 3. INBOUND LEAD SPEED-TO-RESPONSE CORRELATION TO WIN RATE
SELECT 
    CASE 
        WHEN response_time_seconds <= 60 THEN '< 1 Minute (Automated AI)'
        WHEN response_time_seconds <= 900 THEN '1 - 15 Minutes'
        WHEN response_time_seconds <= 3600 THEN '15 - 60 Minutes'
        ELSE '60+ Minutes'
    END AS response_time_bracket,
    COUNT(lead_id) AS total_inbound_leads,
    COUNT(CASE WHEN stage = 'demo_completed' THEN 1 END) AS demos_held,
    ROUND((COUNT(CASE WHEN stage = 'demo_completed' THEN 1.0 END) / COUNT(lead_id)) * 100, 1) AS demo_hold_rate_pct,
    COUNT(CASE WHEN stage = 'closedwon' THEN 1 END) AS closed_won_deals,
    ROUND((COUNT(CASE WHEN stage = 'closedwon' THEN 1.0 END) / COUNT(lead_id)) * 100, 1) AS lead_to_win_rate_pct
FROM inbound_leads_telemetry
WHERE created_at >= NOW() - INTERVAL '120 days'
GROUP BY 1
ORDER BY 1;
