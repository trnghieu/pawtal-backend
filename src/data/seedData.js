const placeholderImage = (text) => ({
  url: `https://placehold.co/600x400?text=${encodeURIComponent(text)}`
});

const dateOnly = (year, month, day) => new Date(year, month - 1, day);

const daysFromNow = (days, hour = 9, minute = 0) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  date.setHours(hour, minute, 0, 0);
  return date;
};

const createSeedData = () => ({
  users: [
    {
      key: 'admin',
      name: 'Pawtal Admin',
      email: 'admin@pawtal.local',
      password: '123456',
      phone: '0909000001',
      address: '1 Nguyen Hue, Quan 1, TP.HCM',
      role: 'admin',
      avatar: placeholderImage('Pawtal Admin')
    },
    {
      key: 'minhAnh',
      name: 'Nguyen Minh Anh',
      email: 'minhanh@pawtal.local',
      password: '123456',
      phone: '0909000002',
      address: '12 Le Loi, Quan 1, TP.HCM',
      role: 'user',
      avatar: placeholderImage('Nguyen Minh Anh')
    },
    {
      key: 'thuHa',
      name: 'Tran Thu Ha',
      email: 'thuha@pawtal.local',
      password: '123456',
      phone: '0909000003',
      address: '45 Vo Van Tan, Quan 3, TP.HCM',
      role: 'user',
      avatar: placeholderImage('Tran Thu Ha')
    }
  ],

  pets: [
    {
      key: 'mit',
      ownerKey: 'minhAnh',
      name: 'Mit',
      type: 'dog',
      breed: 'Corgi',
      gender: 'male',
      dob: dateOnly(2022, 3, 15),
      weight: 12.4,
      color: 'Vang trang',
      microchipId: 'PT-DOG-001',
      avatar: placeholderImage('Mit Corgi')
    },
    {
      key: 'bong',
      ownerKey: 'minhAnh',
      name: 'Bong',
      type: 'cat',
      breed: 'British Shorthair',
      gender: 'female',
      dob: dateOnly(2021, 8, 11),
      weight: 4.6,
      color: 'Xam xanh',
      microchipId: 'PT-CAT-001',
      avatar: placeholderImage('Bong Cat')
    },
    {
      key: 'mochi',
      ownerKey: 'thuHa',
      name: 'Mochi',
      type: 'dog',
      breed: 'Pomeranian',
      gender: 'female',
      dob: dateOnly(2023, 1, 20),
      weight: 3.2,
      color: 'Kem',
      microchipId: 'PT-DOG-002',
      avatar: placeholderImage('Mochi Pomeranian')
    },
    {
      key: 'sua',
      ownerKey: 'thuHa',
      name: 'Sua',
      type: 'cat',
      breed: 'Munchkin',
      gender: 'male',
      dob: dateOnly(2022, 11, 5),
      weight: 3.8,
      color: 'Trang kem',
      microchipId: 'PT-CAT-002',
      avatar: placeholderImage('Sua Cat')
    }
  ],

  healthRecords: [
    {
      petKey: 'mit',
      bloodType: 'DEA 1.1 negative',
      allergies: 'Di ung nhe voi ga cong nghiep',
      chronicDiseases: '',
      sterilized: true,
      notes: 'Can theo doi can nang va khop hong do co tang dong.'
    },
    {
      petKey: 'bong',
      bloodType: 'A',
      allergies: 'Nhay cam voi bo cat co mui',
      chronicDiseases: '',
      sterilized: true,
      notes: 'Co xu huong stress khi di chuyen xa.'
    },
    {
      petKey: 'mochi',
      bloodType: 'DEA 1.1 positive',
      allergies: '',
      chronicDiseases: '',
      sterilized: false,
      notes: 'Da long day, can cham soc da khi thoi tiet nong.'
    },
    {
      petKey: 'sua',
      bloodType: 'B',
      allergies: 'Khong phat hien',
      chronicDiseases: 'Tien su viem duong ruot nhe',
      sterilized: false,
      notes: 'Nen chia nho bua an, han che thay doi thuc an dot ngot.'
    }
  ],

  vaccinations: [
    {
      petKey: 'mit',
      vaccineName: '7 benh cho',
      date: daysFromNow(-320),
      nextDueDate: daysFromNow(45),
      provider: 'PetPro Clinic',
      status: 'done',
      notes: 'Mui nhac lai hang nam.'
    },
    {
      petKey: 'mit',
      vaccineName: 'Dai',
      date: daysFromNow(-210),
      nextDueDate: daysFromNow(150),
      provider: 'PetPro Clinic',
      status: 'done',
      notes: 'Khong co phan ung sau tiem.'
    },
    {
      petKey: 'bong',
      vaccineName: '4 benh meo',
      date: daysFromNow(-160),
      nextDueDate: daysFromNow(205),
      provider: 'Pawtal Vet Center',
      status: 'done',
      notes: 'Can nhac lai dung han.'
    },
    {
      petKey: 'bong',
      vaccineName: 'Dai',
      date: daysFromNow(10),
      nextDueDate: daysFromNow(375),
      provider: 'Pawtal Vet Center',
      status: 'pending',
      notes: 'Da dat lich tiem.'
    },
    {
      petKey: 'mochi',
      vaccineName: '5 benh cho con',
      date: daysFromNow(-90),
      nextDueDate: daysFromNow(270),
      provider: 'Hello Pet Clinic',
      status: 'done',
      notes: 'Mui tiep theo sau 12 thang.'
    },
    {
      petKey: 'sua',
      vaccineName: '4 benh meo',
      date: daysFromNow(-30),
      nextDueDate: daysFromNow(335),
      provider: 'Hello Pet Clinic',
      status: 'done',
      notes: 'Can theo doi than nhiet 24h.'
    }
  ],

  medicalVisits: [
    {
      petKey: 'mit',
      visitDate: daysFromNow(-40),
      reason: 'Kham tong quat dinh ky',
      diagnosis: 'Suc khoe tot, hoi thua can 0.5kg',
      treatment: 'Dieu chinh khau phan an va tang van dong',
      clinic: 'PetPro Clinic',
      vetName: 'Dr. Pham Lan',
      nextVisitDate: daysFromNow(140)
    },
    {
      petKey: 'bong',
      visitDate: daysFromNow(-12),
      reason: 'Bieng an 2 ngay',
      diagnosis: 'Roi loan tieu hoa nhe',
      treatment: 'Men vi sinh 5 ngay va an hat de tieu',
      clinic: 'Pawtal Vet Center',
      vetName: 'Dr. Nguyen Khoa',
      nextVisitDate: daysFromNow(18)
    },
    {
      petKey: 'mochi',
      visitDate: daysFromNow(-65),
      reason: 'Cao rang va kiem tra rang mieng',
      diagnosis: 'Mang bam nhe, khong viem loi',
      treatment: 'Ve sinh rang mieng, huong dan danh rang tai nha',
      clinic: 'Hello Pet Clinic',
      vetName: 'Dr. Tran Vy',
      nextVisitDate: daysFromNow(120)
    },
    {
      petKey: 'sua',
      visitDate: daysFromNow(-7),
      reason: 'Non va tieu long',
      diagnosis: 'Viem ruot nhe do thay doi thuc an',
      treatment: 'Thuoc cam non, bu nuoc va thuc an gastrointestinal',
      clinic: 'Hello Pet Clinic',
      vetName: 'Dr. Le Minh',
      nextVisitDate: daysFromNow(5)
    }
  ],

  products: [
    {
      key: 'dogFoodAdult',
      name: 'Hat cho cho truong thanh vi cuu va gao 2kg',
      category: 'food',
      price: 320000,
      description: 'Thuc an kho cho cho truong thanh, bo sung dam va chat xo de tieu.',
      stock: 40,
      image: placeholderImage('Dog Food')
    },
    {
      key: 'catPateTuna',
      name: 'Pate meo ca ngu 85g',
      category: 'food',
      price: 28000,
      description: 'Pate mem cho meo moi lua tuoi, huong ca ngu de an.',
      stock: 150,
      image: placeholderImage('Cat Pate')
    },
    {
      key: 'leatherCollar',
      name: 'Vong co da cao cap size M',
      category: 'accessory',
      price: 180000,
      description: 'Vong co da mem, co khoa kim loai va cho khac ten.',
      stock: 25,
      image: placeholderImage('Leather Collar')
    },
    {
      key: 'reflectiveLeash',
      name: 'Day dat phan quang 2m',
      category: 'accessory',
      price: 145000,
      description: 'Day dat ben, co soi phan quang di dem.',
      stock: 30,
      image: placeholderImage('Reflective Leash')
    },
    {
      key: 'rubberBallToy',
      name: 'Bong nhai cao su ben',
      category: 'toy',
      price: 99000,
      description: 'Do choi giup giai phong nang luong va ve sinh rang.',
      stock: 50,
      image: placeholderImage('Rubber Ball Toy')
    },
    {
      key: 'catLitterBox',
      name: 'Khay ve sinh meo nap mo',
      category: 'hygiene',
      price: 390000,
      description: 'Khay ve sinh rong rai, de thay cat va de khu mui.',
      stock: 12,
      image: placeholderImage('Cat Litter Box')
    },
    {
      key: 'skinCoatVitamin',
      name: 'Vitamin da long cho cho meo',
      category: 'medicine',
      price: 210000,
      description: 'Ho tro da long, giam rung long theo mua.',
      stock: 35,
      image: placeholderImage('Skin Coat Vitamin')
    },
    {
      key: 'oatShampoo',
      name: 'Sua tam yen mach diu nhe 500ml',
      category: 'hygiene',
      price: 170000,
      description: 'Sua tam phu hop da nhay cam, mui thom nhe.',
      stock: 28,
      image: placeholderImage('Oat Shampoo')
    }
  ],

  services: [
    {
      key: 'groomingBath',
      name: 'Tam spa thu gian',
      description: 'Tam, say, ve sinh tai va cat mong co ban cho thu cung.',
      price: 180000,
      duration: 60,
      image: placeholderImage('Grooming Bath'),
      isActive: true
    },
    {
      key: 'hairCut',
      name: 'Cat tia long theo kieu',
      description: 'Cat tia long theo giong va theo yeu cau co ban.',
      price: 250000,
      duration: 90,
      image: placeholderImage('Hair Cut'),
      isActive: true
    },
    {
      key: 'generalCheckup',
      name: 'Kham tong quat',
      description: 'Kiem tra can nang, nhiet do, da long, tai, rang mieng va tim phoi.',
      price: 150000,
      duration: 30,
      image: placeholderImage('General Checkup'),
      isActive: true
    },
    {
      key: 'vaccinationService',
      name: 'Tiem phong dinh ky',
      description: 'Tu van va tiem phong theo lich cho cho meo.',
      price: 220000,
      duration: 30,
      image: placeholderImage('Vaccination'),
      isActive: true
    },
    {
      key: 'dentalCare',
      name: 'Ve sinh rang mieng',
      description: 'Loai bo mang bam va huong dan cham soc rang mieng tai nha.',
      price: 300000,
      duration: 45,
      image: placeholderImage('Dental Care'),
      isActive: true
    }
  ],

  orders: [
    {
      userKey: 'minhAnh',
      items: [
        { productKey: 'dogFoodAdult', quantity: 2 },
        { productKey: 'leatherCollar', quantity: 1 },
        { productKey: 'rubberBallToy', quantity: 1 }
      ],
      status: 'paid',
      shippingAddress: '12 Le Loi, Quan 1, TP.HCM',
      note: 'Giao gio hanh chinh.'
    },
    {
      userKey: 'thuHa',
      items: [
        { productKey: 'catPateTuna', quantity: 6 },
        { productKey: 'oatShampoo', quantity: 1 },
        { productKey: 'catLitterBox', quantity: 1 }
      ],
      status: 'pending',
      shippingAddress: '45 Vo Van Tan, Quan 3, TP.HCM',
      note: 'Goi truoc khi giao.'
    }
  ],

  appointments: [
    {
      userKey: 'minhAnh',
      petKey: 'mit',
      serviceKey: 'groomingBath',
      appointmentDate: daysFromNow(3, 9, 0),
      timeSlot: '09:00 - 10:00',
      status: 'confirmed',
      notes: 'Can ve sinh tai va cat mong them.'
    },
    {
      userKey: 'minhAnh',
      petKey: 'bong',
      serviceKey: 'generalCheckup',
      appointmentDate: daysFromNow(7, 15, 0),
      timeSlot: '15:00 - 15:30',
      status: 'booked',
      notes: 'Tai kham sau dot roi loan tieu hoa.'
    },
    {
      userKey: 'thuHa',
      petKey: 'mochi',
      serviceKey: 'vaccinationService',
      appointmentDate: daysFromNow(-2, 10, 0),
      timeSlot: '10:00 - 10:30',
      status: 'done',
      notes: 'Da hoan tat mui tiem dinh ky.'
    },
    {
      userKey: 'thuHa',
      petKey: 'sua',
      serviceKey: 'dentalCare',
      appointmentDate: daysFromNow(12, 11, 0),
      timeSlot: '11:00 - 11:45',
      status: 'booked',
      notes: 'Kiem tra hoi mieng va cao mang bam.'
    }
  ]
});

module.exports = createSeedData;
