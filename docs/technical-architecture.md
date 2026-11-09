# Proposed technical architecture

The included prototype is a static browser experience made from HTML, CSS and JavaScript. Topic content is kept in the page code and shown after simple keyword matching. No server, account, external data store or third-party content service is used by the demo. Source links leave the page only when a visitor follows them.

| Component | Intended role | Status |
|---|---|---|
| Web interface | Guided desktop and mobile learning experience | Early local demonstration |
| Topic content | Fixed educational responses with public source links | English samples included; owner and qualified review pending |
| Topic matching | Match common words to a prepared response | Simple browser-only demonstration |
| Language support | English, Kiswahili and Dholuo | English demo only; future translations need review |
| Referrals | Signpost users to verified providers or community health workers | Not implemented; no referral partners confirmed |
| Access channels | Possible messaging or low-bandwidth channels | Not selected or implemented |
| Data and analytics | Improve content based on carefully limited aggregate needs | Not implemented; define purpose and privacy safeguards first |

## Future design constraints

Select technologies only after a technical lead assesses accessibility, low-bandwidth performance, cost, maintainability, licensing, security and data location. Set clear limits on data collection, retention and access before any user information is gathered. Any future referral information must be verified before publication.
