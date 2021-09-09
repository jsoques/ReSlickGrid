# ReSlickGrid

An attempt to use Slickgrid Universal Vanila bundle in React.
Cannot use Create-React-App since webpack config cannot be customized easily to use html-loader required by @slickgrid-universal.

Created a React project from scratch using this some google searches for inspiration. 

Take a look at https://github.com/yakkomajuri/react-from-scratch#readme

Finally take a look at https://github.com/ghiscoding/slickgrid-universal and
https://github.com/ghiscoding/slickgrid-universal/wiki

Git clone this repo.

    yarn install


Things todo:

    *yarn add regenerator-runtime
    *yarn add multiple-select-modified
    (only if done from scratch)

After yarn install

    1) edit filter.service.js in node_modules/@slickgrid-universal/common/dist/esm/services/
    add the following: import "regenerator-runtime/runtime.js";

    2) Copy files from node_modules/multiple-select-modified/src to node_modules/@slickgrid-universal/common/dist/esm/filters/lib

    3) edit index.js in node_modules/@slickgrid-universal/common/dist/esm/filters/
    add the following: export * from './lib/multiple-select.js';

    Very important: remember to do the above if re-installing and/or installing new packages.

Notes:

**Example 04, need to fix/implement autocomplete.**

