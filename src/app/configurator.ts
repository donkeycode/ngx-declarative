import SimpleRestProvider from './core/data-providers/simple';

/*
* Default datagrid configurations
*/
export class Configurator {
    public static apiUrl: string;

    public static restProvider;

    public static paginationPosition;

    public static setConfig(options: {}) {
        for (let key in options) {
          if (key) {
            Configurator[key] = options[key];
          }
        }
    }

    public static getRestProvider() {
        if (Configurator.restProvider) {
            return Configurator.restProvider;
        }

        return SimpleRestProvider;
    }

    public static getPaginationPosition() {
      if (Configurator.paginationPosition) {
          return Configurator.paginationPosition;
      }
      return 'both';
    }
}
