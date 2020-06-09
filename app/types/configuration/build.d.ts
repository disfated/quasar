import { QuasarHookParams, WebpackConfiguration } from "quasar";
import { TerserPluginOptions } from "terser-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import * as WebpackChain from "webpack-chain";
import "./conf";
import "../ts-helpers";

interface QuasarStaticBuildConfiguration {
  /**
   * @version `@quasar/app` 2.0+
   *
   * Transpile JS code with Babel
   *
   * @default true
   */
  transpile: boolean;
  /**
   * Add dependencies for transpiling with Babel (from node_modules, which are by default not transpiled).
   * It is ignored if "transpile" is not set to true.
   * @example [ /my-dependency/, ...]
   */
  transpileDependencies: RegExp[];
  /**
   * @version `@quasar/app` 1.3.4+
   *
   * Add support for also referencing assets for custom tags props.
   *
   * @example { 'my-img-comp': 'src', 'my-avatar': [ 'src', 'placeholder-src' ]}
   */
  transformAssetsUrls: Record<string, string | string[]>;
  /** Show a progress bar while compiling. */
  showProgress: boolean;
  /**
   * Extend Webpack config generated by Quasar CLI.
   * Equivalent to chainWebpack(), but you have direct access to the Webpack config object.
   */
  extendWebpack: (config: WebpackConfiguration) => void;
  /**
   * Extend Webpack config generated by Quasar CLI.
   * Equivalent to extendWebpack(), but using [webpack-chain](https://github.com/neutrinojs/webpack-chain) instead.
   */
  chainWebpack: (chain: WebpackChain) => void;
  /**
   * Prepare external services before `$ quasar dev` command runs
   * like starting some backend or any other service that the app relies on.
   * Can use async/await or directly return a Promise.
   */
  beforeDev: (params: QuasarHookParams) => void;
  /**
   * Run hook after Quasar dev server is started (`$ quasar dev`).
   * At this point, the dev server has been started and is available should you wish to do something with it.
   * Can use async/await or directly return a Promise.
   */
  afterDev: (params: QuasarHookParams) => void;
  /**
   * Run hook before Quasar builds app for production (`$ quasar build`).
   * At this point, the distributables folder hasn’t been created yet.
   * Can use async/await or directly return a Promise.
   */
  beforeBuild: (params: QuasarHookParams) => void;
  /**
   * Run hook after Quasar built app for production (`$ quasar build`).
   * At this point, the distributables folder has been created and is available
   *  should you wish to do something with it.
   * Can use async/await or directly return a Promise.
   */
  afterBuild: (params: QuasarHookParams) => void;
  /**
   * Run hook if publishing was requested (`$ quasar build -P`),
   *  after Quasar built app for production and the afterBuild hook (if specified) was executed.
   * Can use async/await or directly return a Promise.
   * `opts` is Object of form `{arg, distDir}`,
   * where “arg” is the argument supplied (if any) to -P parameter.
   */
  onPublish: (ops: { arg: string; distDir: string }) => void;
  /**
   * Public path of your app.
   * Use it when your public path is something else,
   * like _“<protocol>://<domain>/some/nested/folder”_ – in this case,
   * it means the distributables are in _“some/nested/folder”_ on your webserver.
   *
   * @default '/'
   */
  publicPath: string;
  /**
   * Sets [Vue Router mode](https://router.vuejs.org/guide/essentials/history-mode.html).
   * History mode requires configuration on your deployment web server too.
   *
   * @default 'hash'
   */
  vueRouterMode: "hash" | "history";
  /**
   * @default 'index.html'
   */
  htmlFilename: string;
  /**
   * Folder where Quasar CLI should generate the distributables.
   * Relative path to project root directory.
   *
   * @default 'dist/{ctx.modeName}' For all modes except Cordova.
   * @default 'src-cordova/www' For Cordova mode.
   */
  distDir: string;
  /**
   * Source map [strategy](https://webpack.js.org/configuration/devtool/) to use.
   */
  devtool: WebpackConfiguration["devtool"];
  /**
   * Add properties to `process.env` that you can use in your website/app JS code.
   * Each property needs to be JSON encoded.
   *
   * @example { SOMETHING: JSON.stringify('someValue') }
   */
  env: { [index: string]: string };
  /**
   * Gzip the distributables.
   * Useful when the web server with which you are serving the content does not have gzip.
   *
   * @default false
   */
  gzip: boolean;
  /**
   * Use Webpack scope hoisting for slightly better runtime performance.
   *
   * @default true
   */
  scopeHoisting: boolean;
  /**
   * Show analysis of build bundle with webpack-bundle-analyzer.
   * When providing an object, it represents webpack-bundle-analyzer config options.
   */
  analyze: boolean | BundleAnalyzerPlugin.Options;
  /** Include vue runtime + compiler version, instead of default Vue runtime-only. */
  vueCompiler: boolean;
  /**
   * Minification options. [Full list](https://github.com/webpack-contrib/terser-webpack-plugin/#minify).
   */
  uglifyOptions: TerserPluginOptions["terserOptions"];
  /**
   * Preload chunks when browser is idle to improve user’s later navigation to the other pages.
   *
   * @default true
   */
  preloadChunks: boolean;
  /** Options to supply to `sass-loader` for `.scss` files. */
  scssLoaderOptions: object;
  /** Options to supply to `sass-loader` for [`.sass`](https://github.com/webpack-contrib/sass-loader#sassoptions) files. */
  sassLoaderOptions: object;
  /** Options to supply to `stylus-loader`. */
  stylusLoaderOptions: object;
  /** Options to supply to `less-loader`. */
  lessLoaderOptions: object;
}

/**
 * Following properties of `build` are automatically configured by Quasar CLI
 *  depending on dev/build commands and Quasar mode.
 * You can override some, but make sure you know what you are doing.
 */
interface QuasarDynamicBuildConfiguration {
  /** Extract CSS from Vue files. */
  extractCSS: boolean;
  /** Use source maps. */
  sourceMap: boolean;
  /** Minify code (html, js, css). */
  minify: boolean;
  /**
   * Improves caching strategy.
   * Use a webpack manifest (runtime) file to avoid
   *  cache bust on vendor chunk changing hash on each build.
   */
  webpackManifest: boolean;
}

declare module "quasar" {
  type QuasarBuildConfiguration = Partial<
    QuasarStaticBuildConfiguration & QuasarDynamicBuildConfiguration
  >;
}
