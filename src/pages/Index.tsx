import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

interface Property {
  id: number;
  title: string;
  type: string;
  price: number;
  image: string;
  beds: number;
  baths: number;
  area: number;
  address: string;
  lat: number;
  lng: number;
  rating: number;
  reviews: number;
  available: boolean;
}

const properties: Property[] = [
  {
    id: 1,
    title: 'Современная квартира с видом на море',
    type: 'apartment',
    price: 5000,
    image: 'https://cdn.poehali.dev/projects/def3cd57-0b41-474e-99d3-d9434be9074b/files/3e52603f-b5b9-47ff-a739-da94c1e7a189.jpg',
    beds: 2,
    baths: 1,
    area: 65,
    address: 'ул. Приморская, 12',
    lat: 43.5855,
    lng: 39.7231,
    rating: 4.8,
    reviews: 24,
    available: true
  },
  {
    id: 2,
    title: 'Вилла на берегу моря',
    type: 'villa',
    price: 15000,
    image: 'https://cdn.poehali.dev/projects/def3cd57-0b41-474e-99d3-d9434be9074b/files/287de535-3c7e-4c6a-9f89-881c872eddfa.jpg',
    beds: 4,
    baths: 3,
    area: 180,
    address: 'Курортный проспект, 75',
    lat: 43.5890,
    lng: 39.7201,
    rating: 4.9,
    reviews: 31,
    available: true
  },
  {
    id: 3,
    title: 'Уютная студия в центре',
    type: 'studio',
    price: 3000,
    image: 'https://cdn.poehali.dev/projects/def3cd57-0b41-474e-99d3-d9434be9074b/files/5612420e-d2b7-4663-8c1f-d2ce0d1cfb02.jpg',
    beds: 1,
    baths: 1,
    area: 35,
    address: 'ул. Навагинская, 8',
    lat: 43.5854,
    lng: 39.7208,
    rating: 4.6,
    reviews: 18,
    available: true
  },
  {
    id: 4,
    title: 'Апартаменты с панорамным видом',
    type: 'apartment',
    price: 7000,
    image: 'https://cdn.poehali.dev/projects/def3cd57-0b41-474e-99d3-d9434be9074b/files/3e52603f-b5b9-47ff-a739-da94c1e7a189.jpg',
    beds: 3,
    baths: 2,
    area: 95,
    address: 'пр. Пушкина, 24',
    lat: 43.5901,
    lng: 39.7189,
    rating: 4.7,
    reviews: 22,
    available: false
  },
  {
    id: 5,
    title: 'Комната в центре города',
    type: 'room',
    price: 1500,
    image: 'https://cdn.poehali.dev/projects/def3cd57-0b41-474e-99d3-d9434be9074b/files/5612420e-d2b7-4663-8c1f-d2ce0d1cfb02.jpg',
    beds: 1,
    baths: 1,
    area: 18,
    address: 'ул. Морская, 45',
    lat: 43.5868,
    lng: 39.7215,
    rating: 4.5,
    reviews: 12,
    available: true
  }
];

const reviews = [
  {
    id: 1,
    name: 'Анна Петрова',
    rating: 5,
    text: 'Прекрасная квартира! Все как на фото, чисто и уютно. Рядом море и все необходимое для отдыха.',
    date: '15 окт 2024'
  },
  {
    id: 2,
    name: 'Дмитрий Иванов',
    rating: 5,
    text: 'Отличное место для семейного отдыха. Хозяева очень отзывчивые, помогли с трансфером.',
    date: '22 сен 2024'
  },
  {
    id: 3,
    name: 'Елена Смирнова',
    rating: 4,
    text: 'Хорошие апартаменты, удобное расположение. Единственный минус - парковка платная.',
    date: '8 авг 2024'
  }
];

export default function Index() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [propertyType, setPropertyType] = useState('all');
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [showBooking, setShowBooking] = useState(false);
  const [activeSection, setActiveSection] = useState('catalog');

  const filteredProperties = properties.filter(property => {
    const typeMatch = propertyType === 'all' || property.type === propertyType;
    const priceMatch = property.price >= priceRange[0] && property.price <= priceRange[1];
    return typeMatch && priceMatch;
  });

  const handleBooking = (property: Property) => {
    setSelectedProperty(property);
    setShowBooking(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="MapPin" className="text-primary" size={28} />
            <h1 className="text-2xl font-bold">Сочи.Аренда</h1>
          </div>
          <nav className="hidden md:flex gap-6">
            <Button variant="ghost" onClick={() => setActiveSection('catalog')}>Каталог</Button>
            <Button variant="ghost" onClick={() => setActiveSection('reviews')}>Отзывы</Button>
            <Button variant="ghost" onClick={() => setActiveSection('terms')}>Условия</Button>
            <Button variant="ghost" onClick={() => setActiveSection('contacts')}>Контакты</Button>
          </nav>
          <Button>
            <Icon name="Phone" size={18} className="mr-2" />
            Позвонить
          </Button>
        </div>
      </header>

      <section className="relative h-[500px] flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-primary/5">
        <div className="container text-center space-y-6 animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight">
            Аренда жилья в Сочи
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Найдите идеальное место для отдыха на берегу Черного моря
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto">
                  <Icon name="Calendar" size={18} className="mr-2" />
                  {checkIn ? format(checkIn, 'dd MMM', { locale: ru }) : 'Заезд'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={checkIn} onSelect={setCheckIn} />
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto">
                  <Icon name="Calendar" size={18} className="mr-2" />
                  {checkOut ? format(checkOut, 'dd MMM', { locale: ru }) : 'Выезд'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={checkOut} onSelect={setCheckOut} />
              </PopoverContent>
            </Popover>
            <Button size="lg" className="w-full sm:w-auto">
              <Icon name="Search" size={18} className="mr-2" />
              Найти жильё
            </Button>
          </div>
        </div>
      </section>

      {activeSection === 'catalog' && (
        <section className="container py-12">
          <div className="grid lg:grid-cols-4 gap-8">
            <Card className="lg:col-span-1 h-fit sticky top-20 animate-slide-in">
              <CardContent className="pt-6 space-y-6">
                <div>
                  <Label className="text-base font-semibold mb-3 block">Тип жилья</Label>
                  <Select value={propertyType} onValueChange={setPropertyType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все типы</SelectItem>
                      <SelectItem value="apartment">Квартиры</SelectItem>
                      <SelectItem value="villa">Виллы</SelectItem>
                      <SelectItem value="studio">Студии</SelectItem>
                      <SelectItem value="room">Комнаты</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-base font-semibold mb-3 block">
                    Цена за сутки: {priceRange[0]} - {priceRange[1]} ₽
                  </Label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={20000}
                    step={500}
                    className="mt-4"
                  />
                </div>

                <div className="pt-4 border-t">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Icon name="MapPin" size={18} className="text-primary" />
                    Карта объектов
                  </h3>
                  <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <Icon name="Map" size={48} className="mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Интерактивная карта</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="lg:col-span-3">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-2xl font-bold">
                  Найдено объектов: {filteredProperties.length}
                </h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {filteredProperties.map((property, index) => (
                  <Card 
                    key={property.id} 
                    className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-scale-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => handleBooking(property)}
                  >
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img 
                        src={property.image} 
                        alt={property.title}
                        className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {!property.available && (
                        <Badge className="absolute top-4 right-4 bg-destructive">
                          Забронировано
                        </Badge>
                      )}
                      <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur px-3 py-1 rounded-full">
                        <span className="text-xl font-bold">{property.price} ₽</span>
                        <span className="text-sm text-muted-foreground">/сутки</span>
                      </div>
                    </div>
                    <CardContent className="pt-4 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-semibold text-lg leading-tight">{property.title}</h4>
                      </div>
                      
                      <div className="flex items-center gap-1 text-sm">
                        <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                        <span className="font-semibold">{property.rating}</span>
                        <span className="text-muted-foreground">({property.reviews})</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Icon name="MapPin" size={16} />
                        <span>{property.address}</span>
                      </div>

                      <div className="flex gap-4 pt-2 border-t">
                        <div className="flex items-center gap-1 text-sm">
                          <Icon name="Bed" size={16} className="text-muted-foreground" />
                          <span>{property.beds}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Icon name="Bath" size={16} className="text-muted-foreground" />
                          <span>{property.baths}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Icon name="Maximize" size={16} className="text-muted-foreground" />
                          <span>{property.area} м²</span>
                        </div>
                      </div>

                      <Button className="w-full" disabled={!property.available}>
                        <Icon name="Calendar" size={18} className="mr-2" />
                        Забронировать
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {activeSection === 'reviews' && (
        <section className="container py-12 animate-fade-in">
          <h2 className="text-3xl font-bold mb-8">Отзывы наших клиентов</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <Card key={review.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">{review.name}</h4>
                    <div className="flex gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Icon key={i} name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground">{review.text}</p>
                  <p className="text-sm text-muted-foreground">{review.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {activeSection === 'terms' && (
        <section className="container py-12 max-w-3xl animate-fade-in">
          <h2 className="text-3xl font-bold mb-8">Условия аренды</h2>
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <Icon name="CheckCircle" className="text-primary mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold mb-1">Бронирование</h4>
                    <p className="text-muted-foreground">
                      Для бронирования требуется предоплата 30% от стоимости проживания.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="CheckCircle" className="text-primary mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold mb-1">Заезд и выезд</h4>
                    <p className="text-muted-foreground">
                      Заезд с 14:00, выезд до 12:00. Ранний заезд и поздний выезд возможны по согласованию.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="CheckCircle" className="text-primary mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold mb-1">Отмена брони</h4>
                    <p className="text-muted-foreground">
                      Бесплатная отмена возможна за 7 дней до заезда. При более поздней отмене - возврат 50%.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="CheckCircle" className="text-primary mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold mb-1">Залог</h4>
                    <p className="text-muted-foreground">
                      Залог за сохранность имущества - 5000 ₽, возвращается после выезда.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {activeSection === 'contacts' && (
        <section className="container py-12 max-w-3xl animate-fade-in">
          <h2 className="text-3xl font-bold mb-8">Контакты</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center gap-3">
                  <Icon name="Phone" className="text-primary" size={24} />
                  <div>
                    <p className="text-sm text-muted-foreground">Телефон</p>
                    <p className="font-semibold">+7 (918) 123-45-67</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Mail" className="text-primary" size={24} />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-semibold">info@sochi-rent.ru</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="MapPin" className="text-primary" size={24} />
                  <div>
                    <p className="text-sm text-muted-foreground">Адрес</p>
                    <p className="font-semibold">г. Сочи, ул. Навагинская, 9</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Clock" className="text-primary" size={24} />
                  <div>
                    <p className="text-sm text-muted-foreground">Часы работы</p>
                    <p className="font-semibold">Ежедневно 9:00 - 21:00</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <h3 className="font-semibold text-lg mb-4">Напишите нам</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Имя</Label>
                    <Input id="name" placeholder="Ваше имя" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="your@email.com" />
                  </div>
                  <div>
                    <Label htmlFor="message">Сообщение</Label>
                    <Input id="message" placeholder="Ваш вопрос" />
                  </div>
                  <Button className="w-full">
                    <Icon name="Send" size={18} className="mr-2" />
                    Отправить
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      <Dialog open={showBooking} onOpenChange={setShowBooking}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Бронирование жилья</DialogTitle>
            <DialogDescription>
              {selectedProperty?.title}
            </DialogDescription>
          </DialogHeader>
          {selectedProperty && (
            <div className="space-y-6">
              <img 
                src={selectedProperty.image} 
                alt={selectedProperty.title}
                className="w-full h-64 object-cover rounded-lg"
              />
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Дата заезда</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start mt-2">
                        <Icon name="Calendar" size={18} className="mr-2" />
                        {checkIn ? format(checkIn, 'dd MMMM yyyy', { locale: ru }) : 'Выберите дату'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={checkIn} onSelect={setCheckIn} />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label>Дата выезда</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start mt-2">
                        <Icon name="Calendar" size={18} className="mr-2" />
                        {checkOut ? format(checkOut, 'dd MMMM yyyy', { locale: ru }) : 'Выберите дату'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={checkOut} onSelect={setCheckOut} />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Имя</Label>
                  <Input id="name" placeholder="Иван Иванов" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="phone">Телефон</Label>
                  <Input id="phone" placeholder="+7 (___) ___-__-__" className="mt-2" />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your@email.com" className="mt-2" />
              </div>

              <div className="bg-muted p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span>Цена за сутки:</span>
                  <span className="font-semibold">{selectedProperty.price} ₽</span>
                </div>
                {checkIn && checkOut && (
                  <>
                    <div className="flex justify-between">
                      <span>Количество суток:</span>
                      <span className="font-semibold">
                        {Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))}
                      </span>
                    </div>
                    <div className="flex justify-between text-lg font-bold border-t pt-2">
                      <span>Итого:</span>
                      <span className="text-primary">
                        {selectedProperty.price * Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))} ₽
                      </span>
                    </div>
                  </>
                )}
              </div>

              <Button className="w-full" size="lg">
                <Icon name="CheckCircle" size={18} className="mr-2" />
                Подтвердить бронирование
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <footer className="border-t mt-12 py-8 bg-muted/30">
        <div className="container text-center text-muted-foreground">
          <p>© 2024 Сочи.Аренда - Лучшая недвижимость для вашего отдыха</p>
        </div>
      </footer>
    </div>
  );
}