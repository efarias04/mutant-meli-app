<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D 
-->



<!-- PROJECT SHIELDS -->
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#design-decisions">Design Decisions</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://studio.apicur.io/preview?aid=74334)

This is a backend technical test for a position in Mercado Libre. 

Why?:
* I want to improve my Backend skills. 
* To learn new technologies.

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

This project is built with the following languages ,databases and cloud platform:

* [![Node][Node.js]][Node-url]
* [![Monlgo][MongoDB]][Mongo-url]
* [![Express][Express]][Express-url]
* [![Typescript][Typescript]][Typescript-url]
* [![Heroku][Heroku]][Heroku-url]

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To start, you must take into account the following recommendations and prerequisites

### Prerequisites

It is recommended to install the following versions for the correct operation of the software.

  ```
  * Node JS >= v12.22.0
  * git >= v2.30.0
  * npm >= v6.14.13
  ```

### Installation

_Follow the steps as shown below._

1. Clone the repo

2. Install NPM packages
   ```sh
   npm install
   ```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

To learn more about the OpenAPI Specification, please refer to the service inputs and outputs. _[OpenAPI Specification](https://studio.apicur.io/preview?aid=74334)_ 

_For more examples, please refer to the [Documentation](https://studio.apicur.io/preview?aid=74334)_

_Follow the steps as shown below._

* cURL POST _/mutant_ DNA [ Cloud Platform ]
   ```bash
   curl --location --request POST 'https://mutant-meli-app.herokuapp.com/mutant' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "dna": [
            "ATGCGA",
            "CAGTGC",
            "TTATGG",
            "AGAAGG",
            "CCCCTA",
            "TCACTG"
        ]
    }'
   ```
* cURL GET _/stats_ DNA [ Local ]
   ```bash
   curl --location --request GET 'https://mutant-meli-app.herokuapp.com/stats'
    ```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the MIT License.



<!-- DESIGN DECISIONS -->
## Design Decisions

1. Node JS was chosen for its response time for large amounts of traffic.
2. Typescript: it offers a strong typing, to perform model validations and make a robust development.
3. OpenAPI: Offers a clear and concise contract of what the API offers, both inputs and outputs.
4. Express: A middleware that offers several interesting options, among which request interceptors and OAS validation stand out.
5. MongoDB: It is a NoSQL database, which allows high traffic, horizontal scaling and a dynamic scheme ideal for robust developments. In addition, there are no relationships with other entities.
6. Heroku: It is a cloud platform, which allows you to host APIs with a complete, robust and secure free layer.
7. The suggested design pattern for this solution is the "Strategy Pattern" given that the inputs and outputs are similar, what changes is the way in which each one performs its validation.
8. SOLID principles applied

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/efarias04
[product-screenshot]: static/principal.jpg
[Node.js]: https://img.shields.io/badge/node.js-000000?style=for-the-badge&logo=nodedotjs&logoColor=green
[Node-url]: https://nodejs.org/es/
[MongoDB]: https://img.shields.io/badge/mongodb-000000?style=for-the-badge&logo=mongodb&logoColor=green
[Mongo-url]: https://www.mongodb.com/es
[Express]: https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=4FC08D
[Express-url]: https://expressjs.com/es/
[Typescript]: https://img.shields.io/badge/typescript-000000?style=for-the-badge&logo=typescript&logoColor=3178c6
[Typescript-url]: https://www.typescriptlang.org/
[Heroku]: https://img.shields.io/badge/heroku-000000?style=for-the-badge&logo=heroku&logoColor=79589f
[Heroku-url]: https://dashboard.heroku.com/apps
[Heroku]: https://img.shields.io/badge/heroku-000000?style=for-the-badge&logo=heroku&logoColor=79589f
[Heroku-url]: https://dashboard.heroku.com/apps