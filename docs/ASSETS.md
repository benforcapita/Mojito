# Assets and third-party notices

## Artwork and fonts

All drink artwork in `src/components/DrinkIllustration.tsx` and `public/favicon.svg` is original SVG authored for this project. It is code-native and has no external image service dependency. No stock photos, video footage, or remote fonts are shipped. The design uses fonts installed on the visitor's device.

The earlier prototype linked Pexels photos, a nonexistent `/output.mp4`, a nonexistent favicon, and Google Fonts. Those references were removed instead of bundling assets with unverified provenance. No assertion is made about the license of those earlier photos.

## Runtime dependencies

- React and React DOM: MIT license, retained in their npm packages. https://github.com/facebook/react/blob/main/LICENSE
- Lucide React icons: ISC license, retained in its npm package. https://lucide.dev/license
- GSAP and its React integration: GSAP Standard License. https://gsap.com/standard-license

The existing GSAP dependency is used only for decorative scripted website motion. This project does not provide a visual animation-building tool. No paid plugins or services are required.

The repository did not include a project-wide license at the source baseline. This update does not choose a new license for the repository. Review licensing before redistributing it as a template.
