type BaseProduct = {
    id: string;
    slug: string;
    brand: string;
    model: string;
    price: number;
};

type Speaker = BaseProduct & {
    category: 'speaker'
    subcategory: 'tweeter' | 'subwoofer' | 'midrange' |
                 'coaxial' | 'horn' | 'fullrange';
    sizeInches: number;
    sensitivity: number;
    rmsWatts: number;
    impedanceOhms: number;
    mountingDepth: number;
}
