# Getting started

To use **altron** we need to follow the following steps.

### 1-Installing altron core package

``` bash
pnpm i @altron/altron
```

### 2-Loading blocks dependencies with the cli

``` bash
pnpm dlx @altron/altron-cli
```

### 3-Importing the entry and componentMap

The cli will create a map that links the component name with it svelte class.You need to import and pass it to **altron entry** as a prop.

``` Svelte
<script>
   import Altron from "@altron/altron/altron.svelte"
   import { componentMap } from '$lib/components/altron/index';
</script>

<Altron {componentMap} />
```





