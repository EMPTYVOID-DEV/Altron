<script lang="ts">
  import { Main } from "sveltedocsmaker";
  import { page } from "$app/stores";
  import Logo from "$lib/components/other/logo.svelte";
  import Code from "$lib/components/other/customCode.svelte";
  $: data = $page.data as {
    md: string;
    toc: {
      degree: number;
      name: string;
    }[];
  };

  const sectionMap = new Map([
    [
      "Altron",
      [
        "Introduction",
        "Getting started",
        "Altron cli",
        "Components",
        "What next",
      ],
    ],
    ["Usage", ["Props and css variables", "Utils", "Types"]],
  ]);
</script>

<Main
  {data}
  logo={Logo}
  sectionsMap={sectionMap}
  pathname={$page.url.pathname}
  mdHandlers={{
    code: Code,
  }}
  navlinks={[
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Playground",
      href: "/playground",
    },
  ]}
  githubLink="https://github.com/EMPTYVOID-DEV/Altron"
  npmLink="https://www.npmjs.com/package/@altron/altron"
  navBarHeight={80}
  headingFont="'Montserrat', sans-serif"
  bodyFont="Arial, Helvetica, sans-serif"
  darkPrimary={"#3164ff"}
  darkBgColor={"#000000"}
  darkFontColor={"#ffffff"}
  lightPrimary={"#cc3300"}
  lightBgColor={"#ffffff"}
  lightFontColor={"#000000"}
/>
