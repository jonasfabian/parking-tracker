# Fixtures

Real snapshots of the Parkleitsystem feed, used by the tests instead of the live network.

Save a few snapshots at different times, for example on a weekday evening, on a Saturday afternoon and at night:

```sh
curl -s "https://www.pls-zh.ch/plsFeed/rss" -o tests/fixtures/pls_2026_10_03_1800.xml
```

Add one small file that you edit by hand to cover edge cases: a closed car park, a missing value, an entry with an old timestamp and one broken item.

Source: Parkleitsystem Stadt Zürich, published under CC0.
