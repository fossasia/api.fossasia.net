FOSSASIA API
====

[![Join the chat at https://gitter.im/fossasia/api.fossasia.net](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/fossasia/api.fossasia.net?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## History

Our goal is to collect information about Open Source Communities and Hackspaces all over Asia. This information will be used to aggregate contact data, locations, news feeds and events.
We adopted this API from the Hackerspaces and Freifunk API, invented years before to collect decentralized data.

At the Wireless Community Weekend 2013 in Berlin there was a first meeting to relaunch freifunk.net. To represent local communities without collecting and storing data centrally, a way had to be found. Another requirement was to enable local communities to keep their data up to date easily.

Based on the Hackerspaces API (http://hackerspaces.nl/spaceapi/) the idea of the freifunk API was born: Each community provides its data in a well defined format, hosted on their places (web space, wiki, web servers) and contributes a link to the directory. This directory only consists of the name and an url per community. First services supported by our freifunk API are the global community map and a community feed aggregator.

The freifunk API is designed to collect metadata of communities in a decentral way and make it available to other users. It's not designated to be a freifunk node database or a directory of individual community firmware settings.

## Structure

FOSSASIA API breaks down to several projects, each with its dedicated task :

* [api.fossasia.net](https://github.com/fossasia/api.fossasia.net)

  API-compliant json file generator, and API specification.

* [directory.fossasia.api.net](https://github.com/fossasia/directory.api.fossasia.net)

  directory storing the list of our registered communities. This is where you should look at if you want to add yours.

* [common.fossasia.api.net](https://github.com/fossasia/common.api.fossasia.net)

  set of tools to collect and aggregate the API files, and the Calendar API.

* [feed.fossasia.api.net](https://github.com/fossasia/feed.api.fossasia.net)

  community rss blog feeds merger.

* [cmap.api.fossasia.net](https://github.com/fossasia/cmap.api.fossasia.net)

  interactive FOSSASIA community map.

* [timeline.fossasia.api.net](https://github.com/fossasia/timeline.api.fossasia.net)

  events timeline of registered communities.

## How it works

The "back-end" of FOSSASIA API project is a set communities json files, each containing some general meta-information about a community : name, location, contact, blog/forum/calendar feeds.. Just enough to build interesting projects and statistics. API files must follow a well-defined format, and to make things easier, there's a web-based file generator to help creating / modifying them. Format specification and API file generator are situated at the current [api](https://github.com/fossasia/api.fossasia.net) repo.

From the list of [individual communities files urls](https://github.com/fossasia/directory.api.fossasia.net/blob/master/directory.json), we retrieve API json files and cache them in aggregated files : `ffSummarizedDir.json`, `ffGeoJson.json`, `ffMerged.ics`,using the common aggregator & ics merger in [common](https://github.com/fossasia/common.api.fossasia.net) repo. Other API projects & external services can retrieve API "back-end" data from these files. These aggregator are set up as cron tasks to periodically retrieve fresh data.

The API is designed to make communities metadata available to everyone. There are several public webservice endpoints that users can access : Calendar API in [common](https://github.com/fossasia/common.api.fossasia.net) repo, merged feed rss in [feed](https://github.com/fossasia/feed.api.fossasia.net) repo. These services require the aggregated json file `ffGeoJson.json`.

Finally, there are several visual components : the common map situated at [cmap](https://github.com/fossasia/cmap.api.fossasia.net) repo, that could be embed as iframe in any website. The map also requires `ffGeoJson.json`. And the community timeline in [timeline](https://github.com/fossasia/timeline.api.fossasia.net) repo, which gets its data from Calendar API, and is bundled as a jQuery plugin


## Setup

The API projects are designed to be independent components. Only harmless urls hold them together, which can, in most of the case, be modified in project's configuration file. Please clone any repo as per your needs and refer to its README file for more information.

For detailed setup instructions of the api file generator, visit [here](https://github.com/fossasia/api.fossasia.net/blob/master/generator/README.md)

## Contribute

The most meaningful way to contribute to FOSSASIA API project is to help us reach out to more people and more communities, in ASIA and the world. You can find out how to add new open-source community to our API [here](https://github.com/fossasia/directory.api.fossasia.net).

We equally appreciate development contributions to help build an useful & meaningful project. Feel free to open [issues](https://github.com/fossasia/directory.api.fossasia.net/issues), send us [pull requests](https://github.com/fossasia/directory.api.fossasia.net/pulls), and [chat with the development team](https://gitter.im/fossasia/api.fossasia.net).


## License
- Calendar Icon: Creative Commons Attribution-Share Alike 3.0 Unported license: Font Awesome by Dave Gandy - http://fortawesome.github.com/Font-Awesome
