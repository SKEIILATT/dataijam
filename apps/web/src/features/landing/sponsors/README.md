# Sponsor logos

Add only confirmed sponsors to `sponsors.data.ts`.

```ts
import partnerLogo from '@/assets/images/sponsors/partner.svg'

export const sponsors: Sponsor[] = [
  { id: 'partner', name: 'Partner name', logo: partnerLogo, website: 'https://partner.example' },
]
```

Use official SVGs or transparent PNGs, trimmed to the artwork bounds. PNGs should
be at least 360 × 144 px for the 180 × 72 px display area. Every logo is contained,
never cropped or recolored, on a light tile in both themes. `website` is optional.
Without a URL the logo is not presented as a link. Failed images show the name.

An empty array displays six clearly labelled reserved spaces. Replace these by
adding real records; do not publish fictional brands as confirmed sponsors.

The strip moves continuously on a 45-second linear loop with two identical groups;
each group includes its trailing gap to avoid a seam. There are no scrollbars or
navigation buttons. Like the hero, autoplay is explicitly enabled by design.
It suspends outside the viewport or in a background tab. Duplicate logos are
hidden from assistive technology and have no links. Keyboard focus switches to
a stationary wrapping list of original sponsor links so none are clipped.
