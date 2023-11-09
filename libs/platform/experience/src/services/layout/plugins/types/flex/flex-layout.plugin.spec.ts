import { lastValueFrom } from 'rxjs';
import { FlexLayoutPlugin } from './flex-layout.plugin';

describe('FlexLayoutPlugin', () => {
  let plugin: FlexLayoutPlugin;

  beforeEach(() => {
    plugin = new FlexLayoutPlugin();
  });

  describe('getStyles', () => {
    it('should return an Observable of LayoutStyles', async () => {
      const styles = await import('./flex-layout.styles').then(
        (module) => module.styles
      );
      const result = await lastValueFrom(plugin.getStyles({ options: {} }));

      expect(result).toEqual(styles);
    });
  });

  describe('getConfig', () => {
    it('should return proper schema in the object', async () => {
      const schema = await import('./flex-layout.schema').then(
        (module) => module.schema
      );
      const config = await lastValueFrom(plugin.getConfig?.());
      const result = await (config.schema as () => unknown)();

      expect(result).toEqual(schema);
    });
  });
});