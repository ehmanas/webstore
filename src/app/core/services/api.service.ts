import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Library} from '../library';
import {PriceListProduct} from 'src/app/shared/models/pricelist-product';
import {ProductCategory} from 'src/app/shared/models/product-category';
import {IdNamePair} from 'src/app/shared/models/id-name-pair';
import {Shipper} from 'src/app/shared/models/shipper';


@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient) {
    }

    getFeaturedProducts() {
        return this.http.get<PriceListProduct[]>(Library.apiEndpoint + 'catalog/products/featured');
    }

    getProductCategories() {
        return this.http.get<ProductCategory[]>(Library.apiEndpoint + 'catalog/categories');
    }

    getProducts(categoryId: number) {
        return this.http.get<PriceListProduct[]>(Library.apiEndpoint + 'catalog/products/' + categoryId);
    }

    getSearchingProducts(searchString: string) {
        return this.http.get<PriceListProduct[]>(Library.apiEndpoint + 'catalog/products/search/' + searchString);
    }

    getCountries() {
        return this.http.get<IdNamePair[]>(Library.apiEndpoint + 'common/countries');
    }

    getShippers(countryId: number) {
        return this.http.get<Shipper[]>(Library.apiEndpoint + 'common/shippers');
    }

}
