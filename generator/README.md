# FOSSASIA API Generator
A simple GUI for API files generation http://api.fossasia.net/generator/index.html

## Features 

* Generate compatible JSON file to be used by FOSSASIA API
* Validate API files contents
* Modify your community's API file (if it's already added to [FOSSASIA API directory](https://github.com/fossasia/directory.api.fossasia.net/blob/master/directory.json))
* Download file as JSON

For the complete JSON schema, visit [here](https://github.com/fossasia/api.fossasia.net/blob/master/specs/1.0.1.json).

## How to install
To create an instance of the generator, follow these simple steps : 
* clone the repo `git clone https://github.com/fossasia/api.fossasia.net.git`
* Create `config.json` from sample file `config.json.sample` :

  ```sh
  cd api.fossasia.net
  cp generator/config.json.sample generator/config.json
  ```
* Put the whole repo (or make a symlink) under your php web server. The generator is then accessible at `yourserver.com/api.fossasia.net/generator`
