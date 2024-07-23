import { logger } from "../utils/logger.js";

export function whatNext() {
  logger.info("What next ?");
  logger.info("1-Import altron inside your +page.svelte");
  logger.info("2-Import the componentMap from index.js");
  logger.info("3-Pass the map to altron");
  logger.info("happy coding");
}
