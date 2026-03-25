require('dotenv').config();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const connectDB = require('../config/db');
const createSeedData = require('../data/seedData');

const User = require('../models/User');
const Pet = require('../models/Pet');
const HealthRecord = require('../models/HealthRecord');
const Vaccination = require('../models/Vaccination');
const MedicalVisit = require('../models/MedicalVisit');
const Product = require('../models/Product');
const Service = require('../models/Service');
const Order = require('../models/Order');
const Appointment = require('../models/Appointment');

const destroyData = async () => {
  await Appointment.deleteMany();
  await Order.deleteMany();
  await Vaccination.deleteMany();
  await MedicalVisit.deleteMany();
  await HealthRecord.deleteMany();
  await Pet.deleteMany();
  await Product.deleteMany();
  await Service.deleteMany();
  await User.deleteMany();
};

const importData = async () => {
  const seed = createSeedData();

  const passwordCache = {};
  for (const user of seed.users) {
    passwordCache[user.password] = passwordCache[user.password] || await bcrypt.hash(user.password, 10);
  }

  const createdUsers = await User.insertMany(
    seed.users.map((user) => ({
      name: user.name,
      email: user.email,
      password: passwordCache[user.password],
      phone: user.phone,
      address: user.address,
      role: user.role,
      avatar: user.avatar
    }))
  );

  const usersByKey = Object.fromEntries(seed.users.map((user, index) => [user.key, createdUsers[index]]));

  const createdPets = await Pet.insertMany(
    seed.pets.map((pet) => ({
      owner: usersByKey[pet.ownerKey]._id,
      name: pet.name,
      type: pet.type,
      breed: pet.breed,
      gender: pet.gender,
      dob: pet.dob,
      weight: pet.weight,
      color: pet.color,
      microchipId: pet.microchipId,
      avatar: pet.avatar
    }))
  );

  const petsByKey = Object.fromEntries(seed.pets.map((pet, index) => [pet.key, createdPets[index]]));

  await HealthRecord.insertMany(
    seed.healthRecords.map((record) => ({
      pet: petsByKey[record.petKey]._id,
      bloodType: record.bloodType,
      allergies: record.allergies,
      chronicDiseases: record.chronicDiseases,
      sterilized: record.sterilized,
      notes: record.notes
    }))
  );

  await Vaccination.insertMany(
    seed.vaccinations.map((vaccination) => ({
      pet: petsByKey[vaccination.petKey]._id,
      vaccineName: vaccination.vaccineName,
      date: vaccination.date,
      nextDueDate: vaccination.nextDueDate,
      provider: vaccination.provider,
      status: vaccination.status,
      notes: vaccination.notes
    }))
  );

  await MedicalVisit.insertMany(
    seed.medicalVisits.map((visit) => ({
      pet: petsByKey[visit.petKey]._id,
      visitDate: visit.visitDate,
      reason: visit.reason,
      diagnosis: visit.diagnosis,
      treatment: visit.treatment,
      clinic: visit.clinic,
      vetName: visit.vetName,
      nextVisitDate: visit.nextVisitDate
    }))
  );

  const createdProducts = await Product.insertMany(
    seed.products.map((product) => ({
      name: product.name,
      category: product.category,
      price: product.price,
      description: product.description,
      stock: product.stock,
      image: product.image,
      isActive: typeof product.isActive === 'boolean' ? product.isActive : true
    }))
  );
  const productsByKey = Object.fromEntries(seed.products.map((product, index) => [product.key, createdProducts[index]]));

  const createdServices = await Service.insertMany(
    seed.services.map((service) => ({
      name: service.name,
      description: service.description,
      price: service.price,
      duration: service.duration,
      image: service.image,
      isActive: typeof service.isActive === 'boolean' ? service.isActive : true
    }))
  );
  const servicesByKey = Object.fromEntries(seed.services.map((service, index) => [service.key, createdServices[index]]));

  await Order.insertMany(
    seed.orders.map((order) => {
      const items = order.items.map((item) => {
        const product = productsByKey[item.productKey];
        const price = product.price;
        const subtotal = price * item.quantity;
        return {
          product: product._id,
          quantity: item.quantity,
          price,
          subtotal
        };
      });

      const totalAmount = items.reduce((sum, item) => sum + item.subtotal, 0);

      return {
        user: usersByKey[order.userKey]._id,
        items,
        totalAmount,
        status: order.status,
        shippingAddress: order.shippingAddress,
        note: order.note
      };
    })
  );

  await Appointment.insertMany(
    seed.appointments.map((appointment) => ({
      user: usersByKey[appointment.userKey]._id,
      pet: petsByKey[appointment.petKey]._id,
      service: servicesByKey[appointment.serviceKey]._id,
      appointmentDate: appointment.appointmentDate,
      timeSlot: appointment.timeSlot,
      status: appointment.status,
      notes: appointment.notes
    }))
  );

  console.log('Seed completed successfully.');
  console.log('Admin account: admin@pawtal.local / 123456');
  console.log('User account: minhanh@pawtal.local / 123456');
  console.log('User account: thuha@pawtal.local / 123456');
};

const run = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is missing in .env');
    }

    await connectDB();

    const shouldDestroyOnly = process.argv.includes('--destroy') || process.argv.includes('--clear');
    const shouldImport = process.argv.includes('--import') || (!shouldDestroyOnly);

    if (shouldDestroyOnly) {
      await destroyData();
      console.log('All data destroyed successfully.');
    }

    if (shouldImport) {
      await destroyData();
      await importData();
    }
  } catch (error) {
    console.error('Seed error:', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
};

run();
