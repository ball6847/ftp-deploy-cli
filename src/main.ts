import commander from "commander"
import pkg from "../package.json"
import { deploy, error, success, validateArgs } from "./common"

commander
  .version(pkg.version)
  .arguments("<local> <remote>")
  .action((localInput: string, remoteInput: string) => {
    try {
      const { src, ftp } = validateArgs(localInput, remoteInput)

      // start deployment
      deploy(src, ftp)
        .then(() => success("Done."))
        .catch(() => error("Failed"))
    } catch (e) {
      if (e instanceof TypeError) {
        error(e.message)
      }
    }
  })
  .parse(process.argv)
