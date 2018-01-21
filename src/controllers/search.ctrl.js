export default class SearchController {
    static get GIFS_PER_PAGE() {
        return 30;
    };

    constructor(GiphyService, toaster, $uibModal) {
        this.giphyService = GiphyService;
        this.toaster = toaster;
        this.$uibModal = $uibModal;
        this.searchResults = [];
        this.resetPagination();
    }

    resetPagination() {
        this.pagination = {
            total_count: 0
        };
    }

    search(q) {
        this.resetPagination();
        if (q === '') {
            this.searchResults = [];

            return;
        }

        this.giphyService.search(q, SearchController.GIFS_PER_PAGE, 0)
            .then(res => {
                this.searchResults = res.data.data;
                this.pagination.total_count = res.data.pagination.total_count;
            })
            .catch(() => this.toaster.pop('error', 'An error occurred while searching'))
    }

    loadMore() {
        if (this.pagination.total_count > this.searchResults.length) {
            this.infiniteScrollDisabled = true;
            this.giphyService.search(this.searchText.trim(), SearchController.GIFS_PER_PAGE, this.searchResults.length)
                .then(res => {
                    this.searchResults = this.searchResults.concat(res.data.data);
                    this.infiniteScrollDisabled = false;
                })
                .catch(() => {
                    this.toaster.pop('error', 'An error occurred while searching');
                    this.infiniteScrollDisabled = false;
                })
        }
    }

    showGifDetails(gif) {
        this.$uibModal.open({
            template: `
                <div class="modal-content">
                    <div class="modal-header">
                         <h3 class="modal-title" id="modal-title">${gif.title}</h3>
                    </div>
                    <div class="modal-body">
                        <div class="text-center">
                            <img src="${gif.images.original.url}" class="gif-details-img"/>
                        </div>
                        <table class="table gif-details-table">
                            <tbody>
                                <tr>
                                    <th scope="row">Source URL</th>
                                    <td><a href="${gif.source}" target="_blank">${gif.source}</a></td>
                                </tr>
                                <tr>
                                    <th scope="row">Rating</th>
                                    <td>${gif.rating}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Import date</th>
                                    <td>${new Date(gif.import_datetime).toLocaleString()}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" ng-click="gifDetailsModalCtrl.close()">Close</button>
                    </div>
                </div>`,
            controller: function ($uibModalInstance) {
                this.close = () => $uibModalInstance.close();
            },
            controllerAs: 'gifDetailsModalCtrl'
        }).result.catch(() => {
        });
    }
}