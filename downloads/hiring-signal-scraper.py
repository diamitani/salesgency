"""
Hiring Signal & Job Board Scraper
Author: SalesGency GTM Engineering
Description: Monitors Greenhouse, Lever, and job boards to detect high-growth hiring signals, extracting company domains, open roles, and department expansion triggers.
"""

import sys
import json
import urllib.request
import urllib.parse
from typing import List, Dict, Any

def scrape_greenhouse_jobs(board_token: str) -> List[Dict[str, Any]]:
    """Scrapes open roles from Greenhouse public job board API."""
    url = f"https://boards-api.greenhouse.io/v1/boards/{board_token}/jobs?content=true"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'SalesGency-GTM-Scraper/1.0'})
        with urllib.request.urlopen(req, timeout=10) as response:
            if response.status == 200:
                data = json.loads(response.read().decode('utf-8'))
                jobs = data.get('jobs', [])
                extracted = []
                for job in jobs:
                    extracted.append({
                        "id": job.get("id"),
                        "title": job.get("title"),
                        "location": job.get("location", {}).get("name", "Remote"),
                        "department": job.get("departments", [{}])[0].get("name", "General"),
                        "updated_at": job.get("updated_at"),
                        "url": job.get("absolute_url")
                    })
                return extracted
    except Exception as e:
        print(f"Error scraping Greenhouse board {board_token}: {e}", file=sys.stderr)
    return []

def scrape_lever_jobs(site_name: str) -> List[Dict[str, Any]]:
    """Scrapes open roles from Lever public job board API."""
    url = f"https://api.lever.co/v0/postings/{site_name}?mode=json"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'SalesGency-GTM-Scraper/1.0'})
        with urllib.request.urlopen(req, timeout=10) as response:
            if response.status == 200:
                postings = json.loads(response.read().decode('utf-8'))
                extracted = []
                for post in postings:
                    extracted.append({
                        "id": post.get("id"),
                        "title": post.get("text"),
                        "team": post.get("categories", {}).get("team", "General"),
                        "location": post.get("categories", {}).get("location", "Remote"),
                        "commitment": post.get("categories", {}).get("commitment", "Full-time"),
                        "url": post.get("hostedUrl")
                    })
                return extracted
    except Exception as e:
        print(f"Error scraping Lever site {site_name}: {e}", file=sys.stderr)
    return []

def filter_gtm_roles(jobs: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """Filters jobs matching revenue and sales hiring signals."""
    gtm_keywords = ["sales", "account executive", "sdr", "bdr", "revops", "gtm", "demand gen", "marketing", "growth"]
    matched = []
    for job in jobs:
        title_lower = job.get("title", "").lower()
        if any(kw in title_lower for kw in gtm_keywords):
            matched.append(job)
    return matched

if __name__ == "__main__":
    test_greenhouse_token = "stripe"
    print(f"[*] Extracting hiring intent for Greenhouse board: {test_greenhouse_token}...")
    jobs = scrape_greenhouse_jobs(test_greenhouse_token)
    gtm_jobs = filter_gtm_roles(jobs)
    print(f"[+] Total Open Roles: {len(jobs)} | GTM / Sales Roles: {len(gtm_jobs)}")
    print(json.dumps(gtm_jobs[:3], indent=2))
