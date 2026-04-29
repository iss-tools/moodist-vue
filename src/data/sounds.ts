import { getAssetPath } from '@/helpers/path';
import type { Categories, Category } from './types';

export const nature: Category = {
  icon: 'Trees',
  id: 'nature',
  sounds: [
    { icon: 'Waves', id: 'river', label: 'River', src: getAssetPath('/sounds/nature/river.mp3') },
    { icon: 'Waves', id: 'waves', label: 'Waves', src: getAssetPath('/sounds/nature/waves.mp3') },
    { icon: 'Flame', id: 'campfire', label: 'Campfire', src: getAssetPath('/sounds/nature/campfire.mp3') },
    { icon: 'Wind', id: 'wind', label: 'Wind', src: getAssetPath('/sounds/nature/wind.mp3') },
    { icon: 'Wind', id: 'howling-wind', label: 'Howling Wind', src: getAssetPath('/sounds/nature/howling-wind.mp3') },
    { icon: 'Trees', id: 'wind-in-trees', label: 'Wind in Trees', src: getAssetPath('/sounds/nature/wind-in-trees.mp3') },
    { icon: 'Droplets', id: 'waterfall', label: 'Waterfall', src: getAssetPath('/sounds/nature/waterfall.mp3') },
    { icon: 'Snowflake', id: 'walk-in-snow', label: 'Walk in Snow', src: getAssetPath('/sounds/nature/walk-in-snow.mp3') },
    { icon: 'Leaf', id: 'walk-on-leaves', label: 'Walk on Leaves', src: getAssetPath('/sounds/nature/walk-on-leaves.mp3') },
    { icon: 'Footprints', id: 'walk-on-gravel', label: 'Walk on Gravel', src: getAssetPath('/sounds/nature/walk-on-gravel.mp3') },
    { icon: 'Droplets', id: 'droplets', label: 'Droplets', src: getAssetPath('/sounds/nature/droplets.mp3') },
    { icon: 'Trees', id: 'jungle', label: 'Jungle', src: getAssetPath('/sounds/nature/jungle.mp3') },
  ],
  title: 'Nature',
};

export const rain: Category = {
  icon: 'CloudRain',
  id: 'rain',
  sounds: [
    { icon: 'CloudRain', id: 'light-rain', label: 'Light Rain', src: getAssetPath('/sounds/rain/light-rain.mp3') },
    { icon: 'CloudRain', id: 'heavy-rain', label: 'Heavy Rain', src: getAssetPath('/sounds/rain/heavy-rain.mp3') },
    { icon: 'CloudLightning', id: 'thunder', label: 'Thunder', src: getAssetPath('/sounds/rain/thunder.mp3') },
    { icon: 'Square', id: 'rain-on-window', label: 'Rain on Window', src: getAssetPath('/sounds/rain/rain-on-window.mp3') },
    { icon: 'Car', id: 'rain-on-car-roof', label: 'Rain on Car Roof', src: getAssetPath('/sounds/rain/rain-on-car-roof.mp3') },
    { icon: 'Umbrella', id: 'rain-on-umbrella', label: 'Rain on Umbrella', src: getAssetPath('/sounds/rain/rain-on-umbrella.mp3') },
    { icon: 'Tent', id: 'rain-on-tent', label: 'Rain on Tent', src: getAssetPath('/sounds/rain/rain-on-tent.mp3') },
    { icon: 'Leaf', id: 'rain-on-leaves', label: 'Rain on Leaves', src: getAssetPath('/sounds/rain/rain-on-leaves.mp3') },
  ],
  title: 'Rain',
};

export const animals: Category = {
  icon: 'Dog',
  id: 'animals',
  sounds: [
    { icon: 'Bird', id: 'birds', label: 'Birds', src: getAssetPath('/sounds/animals/birds.mp3') },
    { icon: 'Bird', id: 'seagulls', label: 'Seagulls', src: getAssetPath('/sounds/animals/seagulls.mp3') },
    { icon: 'Bug', id: 'crickets', label: 'Crickets', src: getAssetPath('/sounds/animals/crickets.mp3') },
    { icon: 'Dog', id: 'wolf', label: 'Wolf', src: getAssetPath('/sounds/animals/wolf.mp3') },
    { icon: 'Bird', id: 'owl', label: 'Owl', src: getAssetPath('/sounds/animals/owl.mp3') },
    { icon: 'Bug', id: 'frog', label: 'Frog', src: getAssetPath('/sounds/animals/frog.mp3') },
    { icon: 'Dog', id: 'dog-barking', label: 'Dog Barking', src: getAssetPath('/sounds/animals/dog-barking.mp3') },
    { icon: 'Zap', id: 'horse-gallop', label: 'Horse Gallop', src: getAssetPath('/sounds/animals/horse-gallop.mp3') },
    { icon: 'Heart', id: 'cat-purring', label: 'Cat Purring', src: getAssetPath('/sounds/animals/cat-purring.mp3') },
    { icon: 'Bird', id: 'crows', label: 'Crows', src: getAssetPath('/sounds/animals/crows.mp3') },
    { icon: 'Waves', id: 'whale', label: 'Whale', src: getAssetPath('/sounds/animals/whale.mp3') },
    { icon: 'Zap', id: 'beehive', label: 'Beehive', src: getAssetPath('/sounds/animals/beehive.mp3') },
    { icon: 'Bird', id: 'woodpecker', label: 'Woodpecker', src: getAssetPath('/sounds/animals/woodpecker.mp3') },
    { icon: 'Bird', id: 'chickens', label: 'Chickens', src: getAssetPath('/sounds/animals/chickens.mp3') },
    { icon: 'Dog', id: 'cows', label: 'Cows', src: getAssetPath('/sounds/animals/cows.mp3') },
    { icon: 'Dog', id: 'sheep', label: 'Sheep', src: getAssetPath('/sounds/animals/sheep.mp3') },
  ],
  title: 'Animals',
};

export const urban: Category = {
  icon: 'Building',
  id: 'urban',
  sounds: [
    { icon: 'Users', id: 'crowd', label: 'Crowd', src: getAssetPath('/sounds/urban/crowd.mp3') },
    { icon: 'MapPin', id: 'busy-street', label: 'Busy Street', src: getAssetPath('/sounds/urban/busy-street.mp3') },
    { icon: 'Car', id: 'traffic', label: 'Traffic', src: getAssetPath('/sounds/urban/traffic.mp3') },
    { icon: 'Car', id: 'highway', label: 'Highway', src: getAssetPath('/sounds/urban/highway.mp3') },
    { icon: 'Zap', id: 'fireworks', label: 'Fireworks', src: getAssetPath('/sounds/urban/fireworks.mp3') },
    { icon: 'Bell', id: 'ambulance-siren', label: 'Ambulance Siren', src: getAssetPath('/sounds/urban/ambulance-siren.mp3') },
    { icon: 'Road', id: 'road', label: 'Road', src: getAssetPath('/sounds/urban/road.mp3') },
  ],
  title: 'Urban',
};

export const places: Category = {
  icon: 'MapPin',
  id: 'places',
  sounds: [
    { icon: 'Coffee', id: 'cafe', label: 'Cafe', src: getAssetPath('/sounds/places/cafe.mp3') },
    { icon: 'Library', id: 'library', label: 'Library', src: getAssetPath('/sounds/places/library.mp3') },
    { icon: 'Building', id: 'office', label: 'Office', src: getAssetPath('/sounds/places/office.mp3') },
    { icon: 'Utensils', id: 'restaurant', label: 'Restaurant', src: getAssetPath('/sounds/places/restaurant.mp3') },
    { icon: 'ShoppingBag', id: 'supermarket', label: 'Supermarket', src: getAssetPath('/sounds/places/supermarket.mp3') },
    { icon: 'Plane', id: 'airport', label: 'Airport', src: getAssetPath('/sounds/places/airport.mp3') },
    { icon: 'Train', id: 'subway-station', label: 'Subway Station', src: getAssetPath('/sounds/places/subway-station.mp3') },
    { icon: 'Building', id: 'laundry-room', label: 'Laundry Room', src: getAssetPath('/sounds/places/laundry-room.mp3') },
    { icon: 'Waves', id: 'underwater', label: 'Underwater', src: getAssetPath('/sounds/places/underwater.mp3') },
    { icon: 'Building', id: 'construction-site', label: 'Construction Site', src: getAssetPath('/sounds/places/construction-site.mp3') },
    { icon: 'Building', id: 'church', label: 'Church', src: getAssetPath('/sounds/places/church.mp3') },
    { icon: 'Building', id: 'temple', label: 'Temple', src: getAssetPath('/sounds/places/temple.mp3') },
    { icon: 'Beer', id: 'crowded-bar', label: 'Crowded Bar', src: getAssetPath('/sounds/places/crowded-bar.mp3') },
    { icon: 'Home', id: 'night-village', label: 'Night Village', src: getAssetPath('/sounds/places/night-village.mp3') },
    { icon: 'FerrisWheel', id: 'carousel', label: 'Carousel', src: getAssetPath('/sounds/places/carousel.mp3') },
    { icon: 'FlaskConical', id: 'laboratory', label: 'Laboratory', src: getAssetPath('/sounds/places/laboratory.mp3') },
  ],
  title: 'Places',
};

export const transport: Category = {
  icon: 'Train',
  id: 'transport',
  sounds: [
    { icon: 'Train', id: 'train', label: 'Train', src: getAssetPath('/sounds/transport/train.mp3') },
    { icon: 'Train', id: 'inside-a-train', label: 'Inside a Train', src: getAssetPath('/sounds/transport/inside-a-train.mp3') },
    { icon: 'Plane', id: 'airplane', label: 'Airplane', src: getAssetPath('/sounds/transport/airplane.mp3') },
    { icon: 'Ship', id: 'sailboat', label: 'Sailboat', src: getAssetPath('/sounds/transport/sailboat.mp3') },
    { icon: 'Ship', id: 'rowing-boat', label: 'Rowing Boat', src: getAssetPath('/sounds/transport/rowing-boat.mp3') },
    { icon: 'Ship', id: 'submarine', label: 'Submarine', src: getAssetPath('/sounds/transport/submarine.mp3') },
  ],
  title: 'Transport',
};

export const things: Category = {
  icon: 'Box',
  id: 'things',
  sounds: [
    { icon: 'Clock', id: 'clock', label: 'Clock', src: getAssetPath('/sounds/things/clock.mp3') },
    { icon: 'Keyboard', id: 'keyboard', label: 'Keyboard', src: getAssetPath('/sounds/things/keyboard.mp3') },
    { icon: 'Type', id: 'typewriter', label: 'Typewriter', src: getAssetPath('/sounds/things/typewriter.mp3') },
    { icon: 'Wind', id: 'ceiling-fan', label: 'Ceiling Fan', src: getAssetPath('/sounds/things/ceiling-fan.mp3') },
    { icon: 'Disc', id: 'vinyl-effect', label: 'Vinyl Effect', src: getAssetPath('/sounds/things/vinyl-effect.mp3') },
    { icon: 'Radio', id: 'tuning-radio', label: 'Tuning Radio', src: getAssetPath('/sounds/things/tuning-radio.mp3') },
    { icon: 'Coffee', id: 'boiling-water', label: 'Boiling Water', src: getAssetPath('/sounds/things/boiling-water.mp3') },
    { icon: 'Waves', id: 'bubbles', label: 'Bubbles', src: getAssetPath('/sounds/things/bubbles.mp3') },
    { icon: 'Wind', id: 'wind-chimes', label: 'Wind Chimes', src: getAssetPath('/sounds/things/wind-chimes.mp3') },
    { icon: 'FileText', id: 'paper', label: 'Paper', src: getAssetPath('/sounds/things/paper.mp3') },
    { icon: 'Wind', id: 'singing-bowl', label: 'Singing Bowl', src: getAssetPath('/sounds/things/singing-bowl.mp3') },
    { icon: 'Wind', id: 'dryer', label: 'Dryer', src: getAssetPath('/sounds/things/dryer.mp3') },
    { icon: 'Video', id: 'slide-projector', label: 'Slide Projector', src: getAssetPath('/sounds/things/slide-projector.mp3') },
    { icon: 'Radio', id: 'morse-code', label: 'Morse Code', src: getAssetPath('/sounds/things/morse-code.mp3') },
    { icon: 'Wind', id: 'washing-machine', label: 'Washing Machine', src: getAssetPath('/sounds/things/washing-machine.mp3') },
    { icon: 'Wind', id: 'windshield-wipers', label: 'Windshield Wipers', src: getAssetPath('/sounds/things/windshield-wipers.mp3') },
  ],
  title: 'Things',
};

export const noise: Category = {
  icon: 'Waves',
  id: 'noise',
  sounds: [
    { icon: 'Waves', id: 'white-noise', label: 'White Noise', src: getAssetPath('/sounds/noise/white-noise.wav') },
    { icon: 'Waves', id: 'pink-noise', label: 'Pink Noise', src: getAssetPath('/sounds/noise/pink-noise.wav') },
    { icon: 'Waves', id: 'brown-noise', label: 'Brown Noise', src: getAssetPath('/sounds/noise/brown-noise.wav') },
  ],
  title: 'Noise',
};

export const sounds: {
  categories: Categories;
} = {
  categories: [nature, rain, animals, urban, places, transport, things, noise],
};
