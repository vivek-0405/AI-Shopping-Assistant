import { ShoppingMissionSchema } from '@/schemas/shopping'
import { GrowthDashboardSchema } from '@/schemas/growth'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const MOCK_PRODUCT_COLORS = [
  '#6171f3', '#d946ef', '#f59e0b', '#10b981', '#3b82f6', '#ef4444'
]

const MOCK_PRODUCT_IMAGES = {
  tshirt: [
    'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&auto=format&fit=crop&q=80',
  ],
  laptop: [
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1544731612-de7f96afe55f?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=600&auto=format&fit=crop&q=80',
  ],
  phone: [
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1533228876829-65c94e7b5025?w=600&auto=format&fit=crop&q=80',
  ],
  shoes: [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&auto=format&fit=crop&q=80',
  ],
  skincare: [
    'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1617897903246-719242758050?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1512290900676-26c2a4d4b52b?w=600&auto=format&fit=crop&q=80',
  ],
  gaming: [
    'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=600&auto=format&fit=crop&q=80',
  ],
  default: [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80',
  ],
}

const REAL_CATALOG = {
  tshirt: [
    {
      name: 'Armani Exchange Men Signature Logo Cotton T-Shirt',
      brand: 'Armani Exchange',
      price: 6999,
      originalPrice: 8999,
      store: 'Myntra',
      url: 'https://www.myntra.com/tshirts/armani-exchange',
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80',
      features: ['100% Premium Mercerized Cotton', 'Designer Regular Fit', 'Embossed Signature Logo', 'Crew Neck', 'Imported Quality'],
      pros: ['Iconic luxury fashion statement', 'Ultra-soft mercerized cotton fabric', 'Flawless tailored fit'],
      cons: ['Dry clean or delicate hand wash recommended'],
      badges: ['Best Overall', 'Best Value']
    },
    {
      name: 'Tommy Hilfiger Men Iconic Logo Crew Neck T-Shirt',
      brand: 'Tommy Hilfiger',
      price: 5499,
      originalPrice: 6999,
      store: 'Amazon India',
      url: 'https://www.amazon.in/s?k=Tommy+Hilfiger+T-Shirt',
      image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&auto=format&fit=crop&q=80',
      features: ['100% Organic Cotton', 'Classic Regular Fit', 'Iconic Flag Embroidery', 'Ribbed Collar', 'Soft Touch Finish'],
      pros: ['Premium brand heritage', 'Sustainable organic cotton construction', 'Durable shape retention'],
      cons: ['Slightly premium price point'],
      badges: ['Best Premium']
    },
    {
      name: 'Lacoste Men Classic Fit Cotton Pique T-Shirt',
      brand: 'Lacoste',
      price: 4999,
      originalPrice: 6499,
      store: 'Myntra',
      url: 'https://www.myntra.com/tshirts/lacoste',
      image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&auto=format&fit=crop&q=80',
      features: ['Heavyweight Cotton Pique', 'Iconic Green Crocodile Logo', 'Classic Fit', 'Breathable Weave'],
      pros: ['Timeless elegant style', 'High durability pique cotton knit', 'Breathable feel for warm weather'],
      cons: ['Fit runs traditional european'],
      badges: ['Popular']
    },
    {
      name: 'Calvin Klein Men Monogram Logo Pure Cotton T-Shirt',
      brand: 'Calvin Klein',
      price: 3999,
      originalPrice: 4999,
      store: 'Flipkart',
      url: 'https://www.flipkart.com/search?q=Calvin+Klein+T-Shirt',
      image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&auto=format&fit=crop&q=80',
      features: ['100% Soft Cotton Jersey', 'Modern Slim Fit', 'Monogram Chest Graphic', 'Pre-washed Comfort'],
      pros: ['Sleek minimalist streetwear vibe', 'Body-flattering slim cut', 'Super soft jersey feel'],
      cons: ['Slim fit cut may run snug'],
      badges: ['Best Value']
    },
    {
      name: 'Nike Sportswear Premium Heavyweight T-Shirt',
      brand: 'Nike',
      price: 2495,
      originalPrice: 3295,
      store: 'Nike India',
      url: 'https://www.nike.com/in/w?q=t-shirt',
      image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&auto=format&fit=crop&q=80',
      features: ['Heavyweight Max90 Cotton', 'Loose Casual Fit', 'Embroidered Futura Logo', 'Dropped Shoulders'],
      pros: ['Sturdy structured drape', 'Durable athletic build', 'Streetwear loose fit'],
      cons: ['Heavyweight fabric can feel warm in extreme heat'],
      badges: ['Popular']
    },
    {
      name: 'Adidas Originals Trefoil Oversized T-Shirt',
      brand: 'Adidas',
      price: 1999,
      originalPrice: 2799,
      store: 'Adidas India',
      url: 'https://www.adidas.co.in/search?q=t-shirt',
      image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=600&auto=format&fit=crop&q=80',
      features: ['Single Jersey 100% Cotton', 'Relaxed Oversized Fit', 'Large Trefoil Chest Logo', 'Ribbed Crewneck'],
      pros: ['Iconic retro sports aesthetic', 'Comfortable roomy fit', 'Soft lightweight cotton'],
      cons: ['Oversized cut'],
      badges: ['Popular']
    },
    {
      name: 'U.S. Polo Assn. Men Printed Cotton T-Shirt',
      brand: 'U.S. Polo Assn.',
      price: 1299,
      originalPrice: 1999,
      store: 'Myntra',
      url: 'https://www.myntra.com/us-polo-assn-tshirt',
      image: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=600&auto=format&fit=crop&q=80',
      features: ['100% Combed Cotton', 'Regular Fit', 'Polo Player Graphic', 'Crew Neck'],
      pros: ['Classic preppy style', 'Soft breathable cotton', 'Great mid-tier pricing'],
      cons: ['Standard fit'],
      badges: ['Best Value']
    },
    {
      name: 'Puma Men Solid Crew Neck Cotton T-Shirt',
      brand: 'Puma',
      price: 499,
      originalPrice: 1299,
      store: 'Myntra',
      url: 'https://www.myntra.com/tshirts/puma/puma-men-solid-tshirt/1482938/buy',
      image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=600&auto=format&fit=crop&q=80',
      features: ['100% Cotton', 'Regular Fit', 'Iconic Puma Cat Logo', 'Ribbed Crew Neck', 'Moisture-Wicking Finish'],
      pros: ['Premium brand recognition', 'Durable stitching and collar shape', 'Great for daily sports & casual wear'],
      cons: ['Basic solid minimalist design'],
      badges: ['Best Value']
    },
    {
      name: 'HRX by Hrithik Roshan Men Printed Cotton T-Shirt',
      brand: 'HRX',
      price: 449,
      originalPrice: 1099,
      store: 'Flipkart',
      url: 'https://www.flipkart.com/search?q=HRX+T-Shirt',
      image: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=600&auto=format&fit=crop&q=80',
      features: ['Active-Cotton Blend', 'Rapid-Dry Technology', 'Athletic Fit', 'Reflective Branding'],
      pros: ['Quick-dry moisture management for workouts', 'Athletic fit contours chest', 'Durable active fabric'],
      cons: ['Snug fit on waist'],
      badges: ['Popular']
    },
    {
      name: 'BULLMER Men Printed Oversized Pure Cotton T-Shirt',
      brand: 'BULLMER',
      price: 399,
      originalPrice: 1499,
      store: 'Myntra',
      url: 'https://www.myntra.com/tshirts/bullmer/bullmer-men-printed-oversized-cotton-tshirt/238491/buy',
      image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&auto=format&fit=crop&q=80',
      features: ['100% Pure Cotton', 'Oversized Trendy Fit', 'Graphic Printed Back', 'Drop Shoulder', 'Breathable Fabric'],
      pros: ['Super comfortable streetwear oversized fit', 'High quality durable graphic print', 'Excellent value under ₹400'],
      cons: ['Fit runs loose by design'],
      badges: ['Best Overall', 'Best Value']
    },
    {
      name: 'Veirdo Men Graphic Printed Pure Cotton T-Shirt',
      brand: 'Veirdo',
      price: 349,
      originalPrice: 1199,
      store: 'Amazon India',
      url: 'https://www.amazon.in/s?k=Veirdo+Men+T-Shirt',
      image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&auto=format&fit=crop&q=80',
      features: ['100% Combed Cotton', 'Round Neck', 'Short Sleeves', 'Bio-Washed Fabric', 'Machine Wash'],
      pros: ['Ultra-soft bio-washed fabric', 'Vibrant non-fading print', 'Budget friendly under ₹350'],
      cons: ['Slight shrinkage on hot wash'],
      badges: ['Best Budget']
    },
    {
      name: 'Symbol Premium Men Cotton Regular Fit T-Shirt',
      brand: 'Amazon Symbol',
      price: 299,
      originalPrice: 899,
      store: 'Amazon India',
      url: 'https://www.amazon.in/s?k=Symbol+Men+T-Shirt',
      image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&auto=format&fit=crop&q=80',
      features: ['Pure Combed Cotton', 'Pre-shrunk Fabric', 'Half Sleeves', 'Tagless Comfort Collar'],
      pros: ['Unbeatable budget price under ₹300', 'Tagless itch-free collar', 'Solid staple colors'],
      cons: ['Basic everyday style'],
      badges: ['Best Budget']
    },
    {
      name: 'Roadster Men Solid Pure Cotton Round Neck T-Shirt',
      brand: 'Roadster',
      price: 279,
      originalPrice: 799,
      store: 'Myntra',
      url: 'https://www.myntra.com/tshirts/roadster/roadster-men-solid-tshirt/182938/buy',
      image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&auto=format&fit=crop&q=80',
      features: ['100% Lightweight Cotton', 'Classic Crew Neck', 'Single Jersey Knit', 'Easy Machine Wash'],
      pros: ['Lowest price top-rated t-shirt', 'Soft lightweight feel for summer', 'Wide array of colors'],
      cons: ['Thinner fabric weight'],
      badges: ['Best Value']
    }
  ],
  laptop: [
    {
      name: 'Apple MacBook Air M2 (13.6-inch, 8GB RAM, 256GB SSD)',
      brand: 'Apple',
      price: 89900,
      originalPrice: 99900,
      store: 'Amazon India',
      url: 'https://www.amazon.in/s?k=MacBook+Air+M2',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80',
      features: ['Apple M2 Chip', '13.6-inch Liquid Retina Display', '8GB Unified Memory', '256GB SSD Storage', '18 Hours Battery Life'],
      pros: ['Ultra-thin premium design', 'Exceptional performance and battery life', 'Silent fanless operation'],
      cons: ['Base model has 8GB RAM', 'Supports only 1 external display'],
      badges: ['Best Overall', 'Best Value']
    },
    {
      name: 'ASUS ROG Strix G16 (Intel i7-13650HX, RTX 4060, 16GB, 512GB SSD)',
      brand: 'ASUS',
      price: 114990,
      originalPrice: 139990,
      store: 'Flipkart',
      url: 'https://www.flipkart.com/search?q=ASUS+ROG+Strix+G16',
      image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&auto=format&fit=crop&q=80',
      features: ['Intel Core i7 13th Gen', 'NVIDIA GeForce RTX 4060 8GB', '16GB DDR5 RAM', '512GB PCIe 4.0 SSD', '165Hz FHD+ Display'],
      pros: ['Top-tier gaming & AI compute performance', 'Advanced ROG Intelligent Cooling', 'Smooth 165Hz display'],
      cons: ['Slightly heavy at 2.5kg', 'Shorter battery life under heavy load'],
      badges: ['Best Premium']
    },
    {
      name: 'Lenovo IdeaPad Slim 3 (AMD Ryzen 5 7520U, 16GB RAM, 512GB SSD)',
      brand: 'Lenovo',
      price: 43990,
      originalPrice: 59990,
      store: 'Amazon India',
      url: 'https://www.amazon.in/s?k=Lenovo+IdeaPad+Slim+3',
      image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&auto=format&fit=crop&q=80',
      features: ['AMD Ryzen 5 7520U Processor', '16GB LPDDR5 RAM', '512GB SSD', '15.6-inch FHD Display', 'Dolby Audio'],
      pros: ['Great value for money under 45k', 'Generous 16GB RAM for multitasking', 'Sleek lightweight chassis'],
      cons: ['Plastic build quality', 'Average webcam quality'],
      badges: ['Best Budget']
    },
    {
      name: 'HP Pavilion 15 (13th Gen Intel Core i5-1335U, 16GB, 512GB SSD)',
      brand: 'HP',
      price: 62990,
      originalPrice: 74990,
      store: 'Reliance Digital',
      url: 'https://www.reliancedigital.in/search?q=HP+Pavilion+15',
      image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&auto=format&fit=crop&q=80',
      features: ['13th Gen Intel Core i5-1335U', '16GB DDR4 RAM', '512GB NVMe SSD', 'FHD IPS Micro-Edge Display', 'B&O Audio'],
      pros: ['Reliable build with aluminum keyboard deck', 'Crisp FHD display', 'Fast charging support'],
      cons: ['Integrated Intel Iris Xe graphics'],
      badges: ['Popular']
    },
    {
      name: 'Dell XPS 13 9315 (Intel Core i7-1250U, 16GB RAM, 512GB SSD)',
      brand: 'Dell',
      price: 129990,
      originalPrice: 145000,
      store: 'Croma',
      url: 'https://www.croma.com/search?q=Dell+XPS+13',
      image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&auto=format&fit=crop&q=80',
      features: ['12th Gen Intel Core i7', '16GB LPDDR5 RAM', '512GB PCIe NVMe SSD', '13.4-inch FHD+ InfinityEdge', 'CNC Machined Aluminum'],
      pros: ['Unmatched compact ultrabook design', 'Stunning InfinityEdge bezel-less display', 'Ultra-portable'],
      cons: ['Limited port selection (USB-C only)'],
      badges: ['Best Premium']
    },
    {
      name: 'Acer Swift Go 14 OLED (Intel Core Ultra 5 125H, 16GB, 512GB SSD)',
      brand: 'Acer',
      price: 64999,
      originalPrice: 79999,
      store: 'Amazon India',
      url: 'https://www.amazon.in/s?k=Acer+Swift+Go+14',
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop&q=80',
      features: ['Intel Core Ultra 5 AI Processor', '14-inch 2.8K OLED Display (90Hz)', '16GB LPDDR5X RAM', '512GB SSD', 'Intel Arc Graphics'],
      pros: ['Vibrant 2.8K OLED screen with deep blacks', 'Built-in Intel AI NPU acceleration', 'Lightweight 1.3kg'],
      cons: ['Battery drains faster in 90Hz OLED mode'],
      badges: ['Popular']
    }
  ],
  phone: [
    {
      name: 'Apple iPhone 15 (128GB, Blue)',
      brand: 'Apple',
      price: 71900,
      originalPrice: 79900,
      store: 'Amazon India',
      url: 'https://www.amazon.in/s?k=iPhone+15',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80',
      features: ['Dynamic Island', '48MP Main Camera with 2x Telephoto', 'A16 Bionic Chip', 'USB-C Connector', 'All-Day Battery Life'],
      pros: ['Superb camera quality and video stabilization', 'Dynamic Island UI', 'USB-C charging convenience'],
      cons: ['60Hz display refresh rate'],
      badges: ['Best Overall']
    },
    {
      name: 'Samsung Galaxy S24 5G (8GB RAM, 256GB Storage)',
      brand: 'Samsung',
      price: 74999,
      originalPrice: 79999,
      store: 'Samsung Store',
      url: 'https://www.samsung.com/in/smartphones/galaxy-s24/',
      image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop&q=80',
      features: ['Galaxy AI Features', '6.2-inch Dynamic AMOLED 2X (120Hz)', '50MP Triple Camera', 'Exynos 2400', '7 Years OS Updates'],
      pros: ['Built-in Galaxy AI live translate & Circle to Search', 'Compact ergonomic design', 'Industry-leading 7 years of software updates'],
      cons: ['Fast charging limited to 25W'],
      badges: ['Best Premium']
    },
    {
      name: 'OnePlus 12 (12GB RAM, 256GB Storage, Silky Black)',
      brand: 'OnePlus',
      price: 64999,
      originalPrice: 69999,
      store: 'Amazon India',
      url: 'https://www.amazon.in/s?k=OnePlus+12',
      image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80',
      features: ['Snapdragon 8 Gen 3', '54MP Hasselblad Triple Camera', '5400mAh Battery with 100W SUPERVOOC', '2K 120Hz ProXDR Display'],
      pros: ['Blazing fast 100W charging (0 to 100% in 26 mins)', 'Stunning 2K display brightness', 'Top performance'],
      cons: ['Curved screen edges may cause accidental touches'],
      badges: ['Best Value']
    },
    {
      name: 'Google Pixel 8a (8GB RAM, 128GB Storage)',
      brand: 'Google',
      price: 47999,
      originalPrice: 52999,
      store: 'Flipkart',
      url: 'https://www.flipkart.com/search?q=Google+Pixel+8a',
      image: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=600&auto=format&fit=crop&q=80',
      features: ['Google Tensor G3 Chip', '64MP Dual Rear Camera with Magic Eraser', '6.1-inch Actua 120Hz OLED Display', 'IP67 Water Resistance'],
      pros: ['Best smartphone photography in its price class', 'Clean stock Android with zero bloatware', 'Google AI photo editing tools'],
      cons: ['Slower 18W charging speeds'],
      badges: ['Best Budget']
    },
    {
      name: 'Nothing Phone (2) (12GB RAM, 256GB Storage)',
      brand: 'Nothing',
      price: 37999,
      originalPrice: 44999,
      store: 'Flipkart',
      url: 'https://www.flipkart.com/search?q=Nothing+Phone+2',
      image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&auto=format&fit=crop&q=80',
      features: ['Glyph Interface LED Back', 'Snapdragon 8+ Gen 1', '50MP Dual Sony IMX890 Camera', '6.7-inch LTPO OLED (1-120Hz)'],
      pros: ['Unique transparent Glyph lighting design', 'Smooth Nothing OS 2.5 software', 'Great battery optimization'],
      cons: ['No charger in box'],
      badges: ['Popular']
    },
    {
      name: 'Poco X6 Pro 5G (12GB RAM, 512GB Storage)',
      brand: 'Poco',
      price: 26999,
      originalPrice: 32999,
      store: 'Flipkart',
      url: 'https://www.flipkart.com/search?q=Poco+X6+Pro',
      image: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600&auto=format&fit=crop&q=80',
      features: ['MediaTek Dimensity 8300-Ultra', '64MP OIS Triple Camera', '1.5K 120Hz AMOLED Display', '67W Turbo Charge'],
      pros: ['Flagship-grade performance under ₹30,000', 'Crisp 1.5K AMOLED panel', 'Generous 512GB storage'],
      cons: ['Pre-installed apps in HyperOS'],
      badges: ['Best Budget']
    }
  ],
  shoes: [
    {
      name: 'Puma Velocity NITRO 3 Running Shoes',
      brand: 'Puma',
      price: 7499,
      originalPrice: 9999,
      store: 'Myntra',
      url: 'https://www.myntra.com/puma-velocity-nitro',
      image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&auto=format&fit=crop&q=80',
      features: ['NITRO FOAM advanced technology', 'PUMAGRIP durable rubber outsole', 'Engineered mesh upper', 'PWRTAPE upper reinforcement'],
      pros: ['Best value daily trainer under ₹8,000', 'Responsive lightweight foam cushioning', 'Outstanding grip on wet & dry roads'],
      cons: ['Tongue can shift slightly during long runs'],
      badges: ['Best Overall', 'Best Value']
    },
    {
      name: 'Nike Downshifter 12 Road Running Shoes',
      brand: 'Nike',
      price: 4995,
      originalPrice: 5995,
      store: 'Nike Official Store',
      url: 'https://www.nike.com/in/w?q=Downshifter',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80',
      features: ['Midfoot fitband for stability', 'Super soft foam midsole', 'Breathable mesh throughout', 'Durable rubber sole'],
      pros: ['Lightweight and breathable design', 'Excellent arch and heel support', 'Sleek Nike aesthetic'],
      cons: ['Slightly firm cushioning for heavy runners'],
      badges: ['Best Budget']
    },
    {
      name: 'Skechers Go Run Glide-Step Max',
      brand: 'Skechers',
      price: 5999,
      originalPrice: 7999,
      store: 'Myntra',
      url: 'https://www.myntra.com/skechers-go-run',
      image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600&auto=format&fit=crop&q=80',
      features: ['Glide-Step geometric midsole', 'Skechers Air-Cooled Goga Mat insole', 'ULTRA GO cushioning', 'Machine washable'],
      pros: ['Extremely comfortable for daily walking & running', 'Easy slip-on feel', 'Machine washable for easy cleaning'],
      cons: ['Not designed for competitive racing'],
      badges: ['Popular']
    },
    {
      name: 'Adidas Duramo Speed Running Shoes',
      brand: 'Adidas',
      price: 6599,
      originalPrice: 7999,
      store: 'Adidas India',
      url: 'https://www.adidas.co.in/search?q=Duramo',
      image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format&fit=crop&q=80',
      features: ['LIGHTSTRIKE lightweight cushioning', 'Engineered mesh upper', 'Adiwear durable outsole', 'Made with recycled materials'],
      pros: ['Fast responsive feel for 5K to 10K runs', 'Durable outsole traction', 'Eco-friendly recycled build'],
      cons: ['Firmer ride compared to Ultraboost'],
      badges: ['Best Value']
    },
    {
      name: 'Asics Gel-Contend 8 Running Shoes',
      brand: 'Asics',
      price: 5499,
      originalPrice: 6999,
      store: 'Amazon India',
      url: 'https://www.amazon.in/s?k=Asics+Gel+Contend+8',
      image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=600&auto=format&fit=crop&q=80',
      features: ['Rearfoot GEL technology cushioning', 'AMPLIFOAM midsole', 'OrthoLite sockliner', 'Synthetic stitching on overlays'],
      pros: ['Exceptional shock absorption', 'Durable daily wear construction', 'Great heel hold'],
      cons: ['Basic mesh design'],
      badges: ['Popular']
    },
    {
      name: 'Reebok Floatride Energy 5',
      brand: 'Reebok',
      price: 7999,
      originalPrice: 8999,
      store: 'Flipkart',
      url: 'https://www.flipkart.com/search?q=Reebok+Floatride',
      image: 'https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=600&auto=format&fit=crop&q=80',
      features: ['Floatride Energy Foam', 'Speed Shift upper mesh', 'Midfoot Torsion Plate', 'Full rubber outsole'],
      pros: ['Bouncy energetic toe-off feel', 'Versatile for gym and road running', 'Sturdy midfoot plate'],
      cons: ['Slightly stiff heel counter'],
      badges: ['Popular']
    }
  ],
  skincare: [
    {
      name: 'The Ordinary Niacinamide 10% + Zinc 1% (30ml)',
      brand: 'The Ordinary',
      price: 600,
      originalPrice: 700,
      store: 'Nykaa',
      url: 'https://www.nykaa.com/search/result/?q=The+Ordinary+Niacinamide',
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80',
      features: ['10% High-strength Niacinamide', '1% Zinc PCA', 'Oil-free water-based serum', 'pH 5.50 - 6.50', 'Cruelty-free & Vegan'],
      pros: ['Reduces blemish appearance and pore congestion', 'Balances visible sebum activity', 'Affordable science-backed formula'],
      cons: ['May cause mild tingling for ultra-sensitive skin'],
      badges: ['Best Overall', 'Best Value']
    },
    {
      name: 'Minimalist 10% Vitamin C Face Serum (30ml)',
      brand: 'Minimalist',
      price: 699,
      originalPrice: 799,
      store: 'Amazon India',
      url: 'https://www.amazon.in/s?k=Minimalist+Vitamin+C+Serum',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80',
      features: ['10% Ethyl Ascorbic Acid', 'Centella Asiatica Water base', 'Acetyl Glucosamine', 'Non-comedogenic', 'Fragrance-free'],
      pros: ['Fades dark spots & acne marks', 'Stable non-oxidizing Vitamin C derivative', 'Lightweight fast absorbing'],
      cons: ['Requires consistent use for 4-6 weeks for full results'],
      badges: ['Best Budget']
    },
    {
      name: 'CeraVe Foaming Facial Cleanser for Oily Skin (236ml)',
      brand: 'CeraVe',
      price: 950,
      originalPrice: 1150,
      store: 'Nykaa',
      url: 'https://www.nykaa.com/search/result/?q=CeraVe+Foaming+Cleanser',
      image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=600&auto=format&fit=crop&q=80',
      features: ['3 Essential Ceramides (1, 3, 6-II)', 'Hyaluronic Acid & Niacinamide', 'MVE Technology', 'Dermatologist Developed'],
      pros: ['Cleanses and removes oil without disrupting protective skin barrier', 'Dermatologist #1 recommended brand', 'Gentle foaming formula'],
      cons: ['Larger bottle less travel friendly'],
      badges: ['Best Premium']
    },
    {
      name: 'Neutrogena Hydro Boost Water Gel Moisturizer (50g)',
      brand: 'Neutrogena',
      price: 1050,
      originalPrice: 1250,
      store: 'Amazon India',
      url: 'https://www.amazon.in/s?k=Neutrogena+Hydro+Boost',
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&auto=format&fit=crop&q=80',
      features: ['Purified Hyaluronic Acid', 'Olive Extract Matrix', '100% Alcohol-free & Oil-free', 'Non-comedogenic', '72-Hour Hydration'],
      pros: ['Instant refreshing splash of hydration', 'Zero greasy residue on skin', 'Ideal base under makeup or sunscreen'],
      cons: ['Contains mild pleasant fragrance'],
      badges: ['Popular']
    },
    {
      name: 'Plum 15% Vitamin C Face Serum with Mandarin (30ml)',
      brand: 'Plum',
      price: 495,
      originalPrice: 550,
      store: 'Purplle',
      url: 'https://www.purplle.com/search?q=Plum+Vitamin+C+Serum',
      image: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=600&auto=format&fit=crop&q=80',
      features: ['15% Ethyl Ascorbic Acid', 'Japanese Mandarin Extract', 'Kakadu Plum extract', '100% Vegan & Cruelty-free'],
      pros: ['Boosts skin radiance', 'Natural citrus antioxidant boost', 'Great budget price'],
      cons: ['Slightly sticky initial texture'],
      badges: ['Best Budget']
    },
    {
      name: 'Dot & Key Cica Calming Blemish Control Salicylic Serum',
      brand: 'Dot & Key',
      price: 545,
      originalPrice: 650,
      store: 'Nykaa',
      url: 'https://www.nykaa.com/search/result/?q=Dot+and+Key+Salicylic+Serum',
      image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&auto=format&fit=crop&q=80',
      features: ['2% Salicylic Acid (BHA)', 'Cica (Centella Asiatica)', 'Green Tea Extract', 'Tea Tree Oil', 'Fragrance-free'],
      pros: ['Targets active breakouts and blackheads', 'Soothes inflamed redness', 'Quick absorption'],
      cons: ['Can dry out skin if used more than twice daily'],
      badges: ['Popular']
    }
  ],
  shirt: [
    {
      name: 'Roadster Men Pure Cotton Casual Shirt',
      brand: 'Roadster',
      price: 449,
      originalPrice: 1299,
      store: 'Myntra',
      url: 'https://www.myntra.com/shirts/roadster/roadster-men-pure-cotton-casual-shirt/1943282/buy',
      image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&auto=format&fit=crop&q=80',
      features: ['100% Pure Cotton', 'Slim Fit Design', 'Curved Hem', 'Spread Collar', 'Machine Washable'],
      pros: ['Ultra comfortable 100% breathable cotton', 'Stylish everyday casual fit', 'Great value for money under ₹500'],
      cons: ['Requires light iron after washing'],
      badges: ['Best Overall', 'Best Value']
    },
    {
      name: 'Dennis Lingo Men Solid Casual Slim Fit Cotton Shirt',
      brand: 'Dennis Lingo',
      price: 499,
      originalPrice: 1849,
      store: 'Amazon India',
      url: 'https://www.amazon.in/s?k=Dennis+Lingo+Casual+Shirt',
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=80',
      features: ['100% Premium Cotton', 'Full Sleeves', 'Solid Colorway', 'Single Pocket', 'Pre-washed Fabric'],
      pros: ['Soft premium feel', 'Durable stitch quality', 'Perfect formal or casual crossover shirt'],
      cons: ['Slim fit cut may run slightly snug on broader shoulders'],
      badges: ['Best Budget']
    },
    {
      name: 'Highlander Men Printed Casual Shirt',
      brand: 'Highlander',
      price: 399,
      originalPrice: 1049,
      store: 'Flipkart',
      url: 'https://www.flipkart.com/search?q=Highlander+Shirt',
      image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&auto=format&fit=crop&q=80',
      features: ['Cotton Blend', 'Regular Fit', 'Trendy Micro Print', 'Short Sleeves', 'Lightweight Feel'],
      pros: ['Budget-friendly price under ₹400', 'Cool summer printed style', 'Easy maintenance'],
      cons: ['Poly-cotton blend composition'],
      badges: ['Best Value']
    },
    {
      name: 'U.S. Polo Assn. Men Solid Casual Oxford Shirt',
      brand: 'U.S. Polo Assn.',
      price: 489,
      originalPrice: 2199,
      store: 'Myntra',
      url: 'https://www.myntra.com/us-polo-assn-shirt',
      image: 'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=600&auto=format&fit=crop&q=80',
      features: ['100% Oxford Cotton', 'Iconic Embroidered Logo', 'Button-Down Collar', 'Long Sleeves'],
      pros: ['Classic branded luxury aesthetic', 'Durable Oxford weave fabric', 'Crisp structured collar'],
      cons: ['Slightly heavier fabric weight'],
      badges: ['Best Premium']
    },
    {
      name: 'WROGN Men Slim Fit Checked Casual Shirt',
      brand: 'WROGN',
      price: 479,
      originalPrice: 1999,
      store: 'Myntra',
      url: 'https://www.myntra.com/wrogn-shirt',
      image: 'https://images.unsplash.com/photo-1589310243389-96a5483213a8?w=600&auto=format&fit=crop&q=80',
      features: ['Pure Cotton', 'Bold Tartan Check Pattern', 'Slim Fit', 'Button Placket'],
      pros: ['Vibrant trendy checked design', 'Soft breathable cotton', 'Modern youth fit'],
      cons: ['Colours best preserved with cold hand wash'],
      badges: ['Popular']
    },
    {
      name: 'Peter England Men Regular Fit Formal Cotton Shirt',
      brand: 'Peter England',
      price: 495,
      originalPrice: 1499,
      store: 'Amazon India',
      url: 'https://www.amazon.in/s?k=Peter+England+Shirt',
      image: 'https://images.unsplash.com/photo-1563630423918-b58f07336ac9?w=600&auto=format&fit=crop&q=80',
      features: ['Wrinkle-Resistant Cotton', 'Regular Fit', 'Formal Spread Collar', 'Chest Pocket'],
      pros: ['Easy-iron wrinkle resistant technology', 'Smart office formal attire', 'Comfortable classic fit'],
      cons: ['Plain solid corporate styling'],
      badges: ['Popular']
    }
  ],
  watches: [
    {
      name: 'Fastrack Limitless FS1 Pro Smartwatch',
      brand: 'Fastrack',
      price: 1799,
      originalPrice: 3495,
      store: 'Amazon India',
      url: 'https://www.amazon.in/s?k=Fastrack+Limitless+FS1',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
      features: ['1.96" Super AMOLED Display', 'Single Chip BT Calling', '110+ Sports Modes', '7 Days Battery Life'],
      pros: ['Stunning bright curved AMOLED display', 'Smooth BT calling clarity', 'Value for money'],
      cons: ['Heavy usage reduces battery to 3 days'],
      badges: ['Best Overall', 'Best Value']
    },
    {
      name: 'boAt Wave Call 2 Smartwatch',
      brand: 'boAt',
      price: 1299,
      originalPrice: 6990,
      store: 'Flipkart',
      url: 'https://www.flipkart.com/search?q=boAt+Wave+Call+2',
      image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&auto=format&fit=crop&q=80',
      features: ['1.83" HD Display', 'Advanced Bluetooth Calling', 'HR & SpO2 Health Monitoring', 'IP67 Dust & Sweat Resistance'],
      pros: ['Sub-1500 price point with BT calling', 'Vibrant watch faces', 'Comfortable strap'],
      cons: ['LCD screen visibility under harsh sun'],
      badges: ['Best Budget']
    }
  ]
}

function generateCustomMockProducts(query, budget, count = 6) {
  let subject = query
    .replace(/under\s+₹?\d+[\d,]*/gi, '')
    .replace(/below\s+₹?\d+[\d,]*/gi, '')
    .replace(/less\s+than\s+₹?\d+[\d,]*/gi, '')
    .replace(/for\s+/gi, '')
    .replace(/best\s+/gi, '')
    .replace(/cheap\s+/gi, '')
    .replace(/₹?\d+[\d,]*/gi, '')
    .trim()

  if (!subject) subject = query.trim() || 'Product'

  const subjectTitle = subject.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ')
  const subjectLower = subjectTitle.toLowerCase()

  let brands = ['Brand Pro', 'Elite Series', 'Prime Build', 'Signature', 'Vanguard', 'Apex']
  let categoryImages = [
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80'
  ]
  let stores = ['Amazon India', 'Flipkart', 'Myntra', 'Croma', 'Reliance Digital']

  if (subjectLower.includes('tshirt') || subjectLower.includes('t-shirt') || subjectLower.includes('t shirt') || subjectLower.includes('tee')) {
    brands = ['BULLMER', 'Veirdo', 'Puma', 'HRX', 'Roadster', 'Nike', 'Adidas']
    categoryImages = MOCK_PRODUCT_IMAGES.tshirt
    stores = ['Myntra', 'Amazon India', 'Flipkart', 'Ajio']
  } else if (subjectLower.includes('earbud') || subjectLower.includes('headphone') || subjectLower.includes('audio') || subjectLower.includes('speaker')) {
    brands = ['boAt', 'JBL', 'Sony', 'Realme', 'Noise', 'Sennheiser', 'Boult']
    categoryImages = [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=80'
    ]
    stores = ['Amazon India', 'Flipkart', 'Croma', 'boAt Official Store']
  } else if (subjectLower.includes('chair') || subjectLower.includes('furniture') || subjectLower.includes('table') || subjectLower.includes('desk')) {
    brands = ['Green Soul', 'Cellbell', 'Featherlite', 'Wakefit', 'Sleepwell', 'Nilkamal']
    categoryImages = [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&auto=format&fit=crop&q=80'
    ]
    stores = ['Amazon India', 'Flipkart', 'Pepperfry']
  } else if (subjectLower.includes('bag') || subjectLower.includes('backpack') || subjectLower.includes('luggage')) {
    brands = ['Wildcraft', 'Safari', 'Skybags', 'American Tourister', 'Puma', 'Nike']
    categoryImages = [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1577733966973-d680bffd2e80?w=600&auto=format&fit=crop&q=80'
    ]
    stores = ['Amazon India', 'Myntra', 'Flipkart']
  } else if (subjectLower.includes('tv') || subjectLower.includes('television') || subjectLower.includes('display') || subjectLower.includes('monitor')) {
    brands = ['Samsung', 'LG', 'Sony', 'Xiaomi', 'OnePlus', 'TCL', 'Acer']
    categoryImages = [
      'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&auto=format&fit=crop&q=80'
    ]
    stores = ['Amazon India', 'Flipkart', 'Croma', 'Reliance Digital']
  } else if (subjectLower.includes('keyboard') || subjectLower.includes('mouse') || subjectLower.includes('gaming')) {
    brands = ['Logitech G', 'Razer', 'Redragon', 'Corsair', 'Cosmic Byte', 'Keychron']
    categoryImages = [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80'
    ]
    stores = ['Amazon India', 'Flipkart', 'Croma']
  } else if (subjectLower.includes('perfume') || subjectLower.includes('scent') || subjectLower.includes('fragrance')) {
    brands = ['Jaguar', 'Titan Skinn', 'Beardo', 'Wild Stone', 'Nautica', 'Park Avenue']
    categoryImages = [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&auto=format&fit=crop&q=80'
    ]
    stores = ['Nykaa', 'Myntra', 'Amazon India']
  }

  const products = []

  for (let i = 0; i < count; i++) {
    const brand = brands[i % brands.length]
    const store = stores[i % stores.length]
    const image = categoryImages[i % categoryImages.length]
    let price = 0

    if (budget && budget > 0) {
      price = Math.round(budget * (0.60 + (i % 5) * 0.08))
    } else {
      price = Math.round(1500 + i * 800)
    }

    const originalPrice = Math.round(price * 1.3)
    const matchScore = Math.round(97 - i * 3)

    const name = `${brand} ${subjectTitle} ${i === 0 ? 'Pro' : i === 1 ? 'Ultra' : i === 2 ? 'Essential' : 'Edition'}`
    const searchUrl = `https://www.amazon.in/s?k=${encodeURIComponent(name)}`

    products.push({
      id: `custom-product-${i + 1}`,
      name,
      brand,
      price,
      originalPrice,
      currency: 'INR',
      rating: parseFloat((4.3 + (i % 3) * 0.2).toFixed(1)),
      reviews: Math.round(500 + i * 350),
      matchScore,
      availability: i < 4 ? 'In Stock' : 'Low Stock',
      delivery: i === 0 ? '1-2 days' : i < 3 ? '2-3 days' : '3-5 days',
      features: [
        `High performance ${subjectTitle} build`,
        `Ergonomic & durable materials`,
        `1-Year Official Warranty`,
        `Top customer rating in category`
      ],
      pros: [
        `Best overall ${subjectTitle} within your budget`,
        `Exceptional build quality and comfort`,
        `High user rating on ${store}`
      ],
      cons: [
        `High demand stock`
      ],
      recommendationReason: `Top recommended ${brand} ${subjectTitle} under ₹${(budget || price).toLocaleString()} available on ${store}.`,
      badges: i === 0 ? ['Best Overall', 'Best Value'] : i === 1 ? ['Best Budget'] : ['Popular'],
      category: subjectTitle,
      store,
      url: searchUrl,
      image,
      imageColor: MOCK_PRODUCT_COLORS[i % MOCK_PRODUCT_COLORS.length],
      matchBreakdown: {
        budgetFit: 98,
        featureFit: Math.round(95 - i * 2),
        brandPreference: Math.round(90 - i * 4),
        quality: Math.round(94 - i * 2),
        reviews: Math.round(90 - i * 3),
        value: Math.round(96 - i * 2),
        availability: i < 4 ? 95 : 75,
      },
    })
  }

  return products
}

function extractBudget(input) {
  if (!input) return null

  // 1. Explicit keyword matching with number (e.g. under 8000, below 500, max 60000, ₹8000)
  const keywordMatch = input.match(/(?:under|below|less than|within|around|budget|max|up to|₹|rs\.?)\s*₹?\s*(\d[\d,]*)/i)
  if (keywordMatch && keywordMatch[1]) {
    const val = parseInt(keywordMatch[1].replace(/,/g, ''), 10)
    if (!isNaN(val) && val > 0) return val
  }

  // 2. Standalone number >= 100 (to avoid picking up model numbers like '15' in 'iPhone 15')
  const numbers = input.match(/\b\d[\d,]*\b/g)
  if (numbers) {
    for (const numStr of numbers) {
      const val = parseInt(numStr.replace(/,/g, ''), 10)
      if (!isNaN(val) && val >= 100) {
        return val
      }
    }
  }

  return null
}

function generateMockProducts(query, budget, count = 6) {
  const queryLower = query.toLowerCase()
  let categoryKey = null

  if (/\b(t-?shirt|tee|tshirt|t shirts?)\b/i.test(queryLower)) {
    categoryKey = 'tshirt'
  } else if (/\b(laptop|macbook|pc|computer|notebook)\b/i.test(queryLower)) {
    categoryKey = 'laptop'
  } else if (/\b(phone|smartphone|mobile|iphone|galaxy)\b/i.test(queryLower)) {
    categoryKey = 'phone'
  } else if (/\b(shoes?|sneakers?|footwear|running shoes?)\b/i.test(queryLower)) {
    categoryKey = 'shoes'
  } else if (/\b(watch|smartwatch|watches)\b/i.test(queryLower)) {
    categoryKey = 'watches'
  } else if (/\b(skin|serum|cleanser|cream|skincare)\b/i.test(queryLower)) {
    categoryKey = 'skincare'
  } else if (/\b(shirts?|pants?|trousers?|jeans?|dresses?|apparel|tops?)\b/i.test(queryLower)) {
    categoryKey = 'shirt'
  }

  if (!categoryKey) {
    return generateCustomMockProducts(query, budget, count)
  }

  const fullCatalog = REAL_CATALOG[categoryKey] || REAL_CATALOG.tshirt
  
  // Filter catalog items strictly matching budget limit (item.price <= budget)
  let eligibleItems = fullCatalog
  if (budget && budget > 0) {
    eligibleItems = fullCatalog.filter(item => item.price <= budget)
  }

  // Fallback to custom generated products if no static catalog items fit under budget
  if (eligibleItems.length === 0) {
    return generateCustomMockProducts(query, budget, count)
  }

  // Sort eligible items descending by price so top recommendations feature top choices within user budget
  eligibleItems = [...eligibleItems].sort((a, b) => b.price - a.price)

  const selectedItems = eligibleItems.slice(0, count)
  const products = []

  for (let i = 0; i < selectedItems.length; i++) {
    const item = selectedItems[i]
    let finalPrice = item.price

    // Strict cap: finalPrice must never exceed budget
    if (budget && budget > 0 && finalPrice > budget) {
      finalPrice = Math.round(budget * (0.60 + (i % 5) * 0.08))
    }

    const originalPrice = Math.round(finalPrice * 1.3)
    const matchScore = Math.round(98 - i * 3)
    const catTitle = categoryKey === 'tshirt' ? 'T-Shirts' : categoryKey === 'shirt' ? 'Shirts' : categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1)

    products.push({
      id: `product-${i + 1}`,
      name: item.name,
      brand: item.brand,
      price: finalPrice,
      originalPrice,
      currency: 'INR',
      rating: parseFloat((4.4 + (i % 3) * 0.2).toFixed(1)),
      reviews: Math.round(800 + i * 450),
      matchScore,
      availability: i < 4 ? 'In Stock' : 'Low Stock',
      delivery: i === 0 ? '1-2 days' : i < 3 ? '2-3 days' : '3-5 days',
      features: item.features,
      pros: item.pros,
      cons: item.cons,
      recommendationReason: `Top recommended ${item.brand} ${catTitle} under ₹${(budget || finalPrice).toLocaleString()} available on ${item.store}.`,
      badges: item.badges || (i === 0 ? ['Best Overall', 'Best Value'] : i === 1 ? ['Best Premium'] : ['Popular']),
      category: catTitle,
      store: item.store,
      url: item.url,
      image: item.image,
      imageColor: MOCK_PRODUCT_COLORS[i % MOCK_PRODUCT_COLORS.length],
      matchBreakdown: {
        budgetFit: finalPrice <= (budget || 50000) ? 98 : 75,
        featureFit: Math.round(96 - i * 2),
        brandPreference: Math.round(92 - i * 4),
        quality: Math.round(95 - i * 2),
        reviews: Math.round(92 - i * 3),
        value: Math.round(97 - i * 2),
        availability: i < 4 ? 95 : 75,
      },
    })
  }

  return products
}

export async function mockGenerateShoppingMission(input, signal) {
  await delay(1200 + Math.random() * 800)

  if (signal?.aborted) throw new Error('Request aborted')

  const budget = extractBudget(input) || 5000
  const products = generateMockProducts(input, budget, 6)

  let categoryName = products[0]?.category || 'Apparel'
  if (/t-?shirt|tee|tshirt/i.test(input)) categoryName = 'T-Shirts'
  else if (/laptop|macbook|pc/i.test(input)) categoryName = 'Laptops'
  else if (/phone|smartphone|mobile/i.test(input)) categoryName = 'Smartphones'
  else if (/shoes?|sneakers?/i.test(input)) categoryName = 'Footwear'
  else if (/watch|smartwatch/i.test(input)) categoryName = 'Watches'
  else if (/skincare|serum/i.test(input)) categoryName = 'Skincare'

  const rawResponse = {
    mission: {
      title: input.trim(),
      budget,
      currency: 'INR',
      preferences: [
        'Verified Indian seller',
        'Top customer rating',
        'Strictly within budget',
        'Fast shipping',
      ],
      category: categoryName,
      urgency: 'Medium',
    },
    recommendations: products,
    comparison: {
      bestOverall: 'product-1',
      bestValue: 'product-1',
      bestPremium: 'product-2',
      bestBudget: 'product-3',
    },
    nextActions: [
      'Compare top choices',
      'Check size & fit guide',
      'Track price drop alerts',
      'View store return policies',
      'Check pincode delivery options',
    ],
    agentInsight: `Based on your query '${input}', I've aggregated ${products.length} top options within your budget limit of ₹${budget.toLocaleString()}. The top recommendation provides optimal value and ratings.`,
  }

  const result = ShoppingMissionSchema.safeParse(rawResponse)

  if (!result.success) {
    console.error('Mock AI validation failed:', result.error)
    throw new Error('Mock AI response validation failed')
  }

  return result.data
}

export async function mockGenerateGrowthDashboard(signal) {
  await delay(1500 + Math.random() * 1000)

  if (signal?.aborted) throw new Error('Request aborted')

  const rawResponse = {
    insights: [
      {
        id: 'insight-1',
        type: 'conversion',
        title: 'Checkout Abandonment Opportunity',
        description:
          'Users frequently compare 3+ products but abandon before checkout. AI-assisted decision support could significantly reduce drop-off.',
        opportunityScore: 91,
        expectedImpact: '+8-12% conversion',
        recommendedAction:
          'Introduce AI comparison summary and personalized bundle recommendations at checkout.',
        effort: 'Medium',
        timeframe: '2-3 weeks',
      },
      {
        id: 'insight-2',
        type: 'revenue',
        title: 'Cross-sell Bundle Gap',
        description:
          'High-intent users purchasing electronics rarely see complementary accessories. Bundle recommendations could increase AOV significantly.',
        opportunityScore: 87,
        expectedImpact: '+15-20% AOV',
        recommendedAction:
          'Deploy AI bundle engine to surface complementary products during product view and cart stages.',
        effort: 'Low',
        timeframe: '1 week',
      },
      {
        id: 'insight-3',
        type: 'retention',
        title: 'Re-engagement Window',
        description:
          'Customers who made a purchase 45-60 days ago show strong re-engagement potential based on browsing patterns.',
        opportunityScore: 78,
        expectedImpact: '+25% repeat rate',
        recommendedAction:
          'Launch personalized AI-curated re-engagement campaigns targeting 45-day inactive users.',
        effort: 'Low',
        timeframe: '1-2 weeks',
      },
      {
        id: 'insight-4',
        type: 'acquisition',
        title: 'High-Value Segment Lookalike',
        description:
          'Premium buyer segment shows distinct behavioral patterns that can be used to identify acquisition targets.',
        opportunityScore: 82,
        expectedImpact: '+30% ROAS',
        recommendedAction:
          'Build lookalike audiences from premium buyer segment for targeted acquisition campaigns.',
        effort: 'Medium',
        timeframe: '2-4 weeks',
      },
    ],
    segments: [
      {
        id: 'seg-1',
        name: 'High Intent',
        description: 'Users who search, compare, and return to products multiple times before purchasing.',
        size: 12400,
        conversionRate: 8.4,
        averageOrderValue: 52000,
        revenue: 54182000,
        growthOpportunity: 'AI-assisted checkout nudges could convert 15% more of this segment.',
        traits: ['Multi-session browsing', 'Product comparison', 'Review reading', 'Price tracking'],
        color: '#6171f3',
      },
      {
        id: 'seg-2',
        name: 'Price Sensitive',
        description: 'Deal-seeking users who wait for discounts and frequently abandon carts at full price.',
        size: 28900,
        conversionRate: 3.2,
        averageOrderValue: 18500,
        revenue: 17121600,
        growthOpportunity: 'Personalized discount triggers could unlock ₹8.5M additional revenue.',
        traits: ['Cart abandonment', 'Coupon hunting', 'Sale event buyers', 'Price comparison'],
        color: '#f59e0b',
      },
      {
        id: 'seg-3',
        name: 'Premium Buyers',
        description: 'Quality-focused users with higher budgets who prioritize brand and features over price.',
        size: 4200,
        conversionRate: 12.7,
        averageOrderValue: 95000,
        revenue: 50715000,
        growthOpportunity: 'Concierge AI experience could increase AOV by 25% for this segment.',
        traits: ['Premium brands', 'High AOV', 'Fast decisions', 'Loyalty potential'],
        color: '#d946ef',
      },
      {
        id: 'seg-4',
        name: 'Explorers',
        description: 'Curious users with broad interests who discover products through browsing and recommendations.',
        size: 31200,
        conversionRate: 2.1,
        averageOrderValue: 12400,
        revenue: 8134080,
        growthOpportunity: 'AI discovery engine could convert 3x more explorers through personalization.',
        traits: ['Wide browsing', 'Category hopping', 'Recommendation-driven', 'Mobile-first'],
        color: '#10b981',
      },
    ],
    experiments: [
      {
        id: 'exp-1',
        title: 'AI Personalized Product Bundles',
        hypothesis: 'Showing AI-curated bundles at cart stage will increase average order value by reducing decision fatigue.',
        metric: 'AOV',
        expectedImpact: '+7% AOV',
        effort: 'Low',
        confidence: 85,
        segment: 'High Intent',
      },
      {
        id: 'exp-2',
        title: 'Smart Checkout Recommendations',
        hypothesis: 'Real-time AI recommendations at checkout will reduce abandonment and increase conversions.',
        metric: 'Conversion Rate',
        expectedImpact: '+5% CVR',
        effort: 'Medium',
        confidence: 78,
        segment: 'Price Sensitive',
      },
      {
        id: 'exp-3',
        title: 'Personalized Re-engagement Flows',
        hypothesis: 'AI-personalized re-engagement emails will outperform generic campaigns for lapsed users.',
        metric: 'Repeat Purchase Rate',
        expectedImpact: '+22% RPR',
        effort: 'Low',
        confidence: 91,
        segment: 'All Segments',
      },
    ],
  }

  const result = GrowthDashboardSchema.safeParse(rawResponse)

  if (!result.success) {
    console.error('Mock growth data validation failed:', result.error)
    throw new Error('Mock growth data validation failed')
  }

  return result.data
}