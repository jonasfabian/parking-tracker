# 0001 Data source and access from the browser

Status: open

## Context

Live occupancy comes from the RSS feed of the Parkleitsystem Stadt Zürich (https://www.pls-zh.ch/plsFeed/rss).
The feed is updated about once per minute and published under CC0.
Other projects report that fetching the feed directly from the browser fails because of cross origin restrictions.
The operator plans to move the data to a European data standard, so the feed format may change.

## Options

1. Fetch the feed directly in the browser.
2. Fetch it through a small proxy function that also caches the response for a short time.
3. Fetch it on a schedule and publish a static JSON file.

## Decision

To be written after the CORS test.

## Consequences

To be written. Consider: freshness, cost, operations effort, and how easy it is to switch to a new feed format later.
