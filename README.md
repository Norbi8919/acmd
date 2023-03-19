```
                                /\ \
   __       ___     ___ ___     \_\ \
 /'__`\    /'___\ /' __` __`\   /'_` \
/\ \L\.\_ /\ \__/ /\ \/\ \/\ \ /\ \L\ \
\ \__/.\_\\ \____\\ \_\ \_\ \_\\ \___,_\
 \/__/\/_/ \/____/ \/_/\/_/\/_/ \/__,_ /
```

## _Ash's CMD tool_

A bunch of utilities that are very specific to my needs. I'm not sure if anyone else would find them useful, but I'm putting them here anyway.

### Installation

```bash
npm i -g acmd
```

### Commands

Because I'm lazy, this is just the copy-pasted output of the terminal help messages.

```
$ acmd
Commands:
  nebula
  caddy
  kube
  ffmpeg
```

```
$ acmd nebula
Commands:
  configure       Configure Nebula
  start           Start Nebula
  print           Print Nebula config
```

```
$ acmd caddy
Commands:
  configure       Configure Caddy
  start           Start Caddy
  stop            Stop Caddy
  print           Print Caddy config
```

```
$ acmd kube
Commands:
  nodes [options]                  Get all nodes
  pods [options]                   Get all pods
  describe-pod [options] <pod-id>  Describe a specific pod
  pod-logs [options] <pod-id>      Get pod logs
  latest-pod [options]             Get the latest pod name
```

```
$ acmd ffmpeg
Commands:
  trim [options] <input>  Trim a video file
  count-frames <input>    Count the number of frames in a video file
```
