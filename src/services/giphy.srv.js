export default class GiphyService {
    constructor(config, $http) {
        this.config = config;
        this.$http = $http;
    }

    search(q, limit, offset) {
        return this.$http.get(`${this.config.giphyApiUrl}/gifs/search`, {
            params: {
                q,
                limit,
                offset,
                api_key: this.config.giphyApiKey
            }
        });
    }
}