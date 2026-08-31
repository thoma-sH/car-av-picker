type BaseProduct = {
    id: string;
    slug: string;
    brand: string;
    model: string;
    priceCents: number;
};

export type Speaker = BaseProduct & {
    category: 'speaker'
    subcategory: 'tweeter' | 'subwoofer' | 'midrange' |
                 'coaxial' | 'horn' | 'fullrange';
    sizeInches: number;
    sensitivity: number;
    rmsWatts: number;
    impedanceOhms: number;
    freqLowHz: number;
    freqHighHz: number;
    mountingDepth: number;
}

type PowerRating = {
  channelsDriven: number;
  impedanceOhms: number;
  wattsPerChannel: number;
  bridged: boolean;
};

export type Amplifier = BaseProduct & {
  category: 'amplifier';
  totalChannels: number;
  powerRatings: PowerRating[];
  minImpedanceOhms: number;
  ampClass: 'A/B' | 'D';
  fuseRatingA: number;
};

export type Product = Speaker | Amplifier;

export const products: Product[] = [
  {
    id: '1',
    slug: 'jbl-club-625sq',
    brand: 'JBL',
    model: 'Club 625SQ',
    priceCents: 9995,
    category: 'speaker',
    subcategory: 'coaxial',
    sizeInches: 6.5,
    sensitivity: 91,
    rmsWatts: 50,
    impedanceOhms: 3,
    mountingDepth: 51,
  },
  {
    id: '2',
    slug: 'rockford-fosgate-r2-750x5',
    brand: 'Rockford Fosgate',
    model: 'R2-750X5',
    priceCents: 39999,
    category: 'amplifier',
    totalChannels: 5,
    powerRatings: [
      { channelsDriven: 4, impedanceOhms: 4, wattsPerChannel: 50,  bridged: false },
      { channelsDriven: 4, impedanceOhms: 2, wattsPerChannel: 75,  bridged: false },
      { channelsDriven: 1, impedanceOhms: 2, wattsPerChannel: 400, bridged: false },
    ],
    minImpedanceOhms: 2,
    ampClass: 'D',
    fuseRatingA: 60,
  }
];