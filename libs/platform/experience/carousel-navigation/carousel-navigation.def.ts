import { componentDef } from '@oryx-frontend/utilities';

export const carouselNavigationComponent = componentDef({
  name: 'oryx-carousel-navigation',
  impl: () =>
    import('./carousel-navigation.component').then(
      (m) => m.CarouselNavigationComponent
    ),
});
