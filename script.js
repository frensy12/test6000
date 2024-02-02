document.addEventListener('DOMContentLoaded', function () {
    const searchBar = document.getElementById('searchBar');
    const searchButton = document.getElementById('searchButton');

    // List of proxy servers
    const proxies = [
      '46.4.96.137:1080',
      '45.77.56.114:30205',
      '82.196.11.105:1080',
      '51.254.69.243:3128',
      '185.153.198.226:32498',
      '183.215.23.242:9091',
      '159.65.221.25:80',
      '221.151.181.101:8000',
      '45.131.7.248:80',
      '159.112.235.175:80',
      '172.64.160.12:80',
      '31.43.179.34:80',
      '185.162.231.126:80',
      '172.64.160.12:80',
      '5.199.171.227:3128',
      '93.171.164.251:8080',
      '185.118.141.254:808',
      '83.79.50.233:64527',
      '83.77.118.53:17171'
    ];

    searchButton.addEventListener('click', function () {
        const searchQuery = searchBar.value.trim();

        if (searchQuery !== '') {
            attemptRequestWithAllProxies(searchQuery, proxies);
        }
    });

    function attemptRequestWithAllProxies(searchQuery, proxies) {
        // Use Promise.all to make requests with all proxies concurrently
        Promise.all(proxies.map(proxyUrl => makeRequest(proxyUrl, searchQuery)))
            .then(responses => {
                // Handle responses here
                responses.forEach(response => console.log(response));
            })
            .catch(error => {
                console.error('Error fetching search results:', error);
            });
    }

    function makeRequest(proxyUrl, searchQuery) {
        const url = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;

        return fetch(proxyUrl + '?' + url)
            .then(response => response.text())
            .catch(error => {
                console.error(`Error with proxy ${proxyUrl}:`, error);
                // Continue with the next proxy even if one fails
                return Promise.resolve(null);
            });
    }
});