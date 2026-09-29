# 0001 Data source and access from the browser

Status: accepted (29 September 2026)

## Context

Live occupancy comes from the RSS feed of the Parkleitsystem Stadt Zürich (https://www.pls-zh.ch/plsFeed/rss).
The feed is updated about once per minute, published under CC0 and sent without caching headers.
Another project reported that fetching the feed from the browser failed because of cookies and cross origin restrictions.
The operator plans to move the data to a European data standard, so the feed format may change.

## Options

1. Fetch the feed directly in the browser.
2. Fetch it through a small proxy function that also caches the response for a short time.
3. Fetch it on a schedule and publish a static JSON file.

## Decision

We fetch the feed directly in the browser (option 1).

A test from localhost on 29 September 2026 returned the full feed.
The response contains `Access-Control-Allow-Origin: *`, so the browser allows the request from any origin, including the production domain.

The server also sets a session cookie.
With a wildcard origin the browser must not send credentials, so the app uses the default fetch settings and never sets `credentials: 'include'`.

The feed changes at most once per minute and sends no caching headers, so each client fetches it at most once per minute.

## Consequences

The app needs no server, costs nothing to run and has no operations effort.
Data is as fresh as the feed itself, because there is no cache in between.

The app depends on the city keeping the CORS header and the current format.
To limit the impact, fetching and XML parsing live in an adapter in `src/data`.
The core only receives raw entries with plain strings, so a new format or a different access path only changes the adapter.

If the header disappears, we switch to option 2: a small proxy function that fetches the feed and caches it for about one minute.
If the operator moves to the European standard, we write a new adapter and keep the core unchanged.

Every visitor sends their own requests to the city's server.
At the expected traffic this is acceptable. If traffic grows, option 2 also reduces the load on the source.
