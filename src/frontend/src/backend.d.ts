import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
export interface PromoCode {
    id: PromoCodeId;
    status: PromoStatus;
    expiryDate: Timestamp;
    code: string;
    discountAmount: bigint;
    discountType: DiscountType;
    usageCount: bigint;
    usageLimit: bigint;
}
export interface Driver {
    id: DriverId;
    status: DriverStatus;
    vehicleType: VehicleType;
    vehiclePlate: string;
    cnic: string;
    name: string;
    rank: DriverRank;
    vehicleModel: string;
    licenseNumber: string;
    vehicleColor: string;
    rating: number;
    phone: string;
    activationCode: string;
    walletBalance: bigint;
    totalRides: bigint;
}
export type PromoCodeId = bigint;
export type ActivationCodeId = bigint;
export type RideId = bigint;
export type AdminLogId = bigint;
export interface Customer {
    id: CustomerId;
    status: CustomerStatus;
    joinDate: Timestamp;
    name: string;
    email: string;
    phone: string;
    walletBalance: bigint;
    totalRides: bigint;
}
export interface ActivationCode {
    id: ActivationCodeId;
    expiryDate: Timestamp;
    code: string;
    usedAt?: Timestamp;
    usedBy?: string;
    used: boolean;
}
export interface Wallet {
    driverId: DriverId;
    totalEarned: bigint;
    lastUpdated: Timestamp;
    commissionOwed: bigint;
    netBalance: bigint;
}
export interface Ride {
    id: RideId;
    otp: string;
    status: RideStatus;
    dropLat: number;
    dropLng: number;
    completedAt?: Timestamp;
    driverId?: DriverId;
    vehicleType: VehicleType;
    paymentMethod: PaymentMethod;
    driverRating?: bigint;
    pickupLat: number;
    pickupLng: number;
    createdAt: Timestamp;
    customerRating?: bigint;
    totalFare: bigint;
    pickupAddress: string;
    customerId: CustomerId;
    dropAddress: string;
    distanceFare: bigint;
    baseFare: bigint;
}
export type DriverId = bigint;
export type CustomerId = bigint;
export interface AdminLog {
    id: AdminLogId;
    action: string;
    target: string;
    timestamp: Timestamp;
    details: string;
    adminId: string;
}
export enum CustomerStatus {
    active = "active",
    banned = "banned",
    suspended = "suspended"
}
export enum DiscountType {
    fixed = "fixed",
    percentage = "percentage"
}
export enum DriverRank {
    Diamond = "Diamond",
    Gold = "Gold",
    Platinum = "Platinum"
}
export enum DriverStatus {
    blocked = "blocked",
    suspended = "suspended",
    offline = "offline",
    onRide = "onRide",
    online = "online"
}
export enum PaymentMethod {
    cash = "cash",
    jazzCash = "jazzCash",
    easypaisa = "easypaisa",
    wallet = "wallet"
}
export enum PromoStatus {
    active = "active",
    inactive = "inactive"
}
export enum RideStatus {
    reached = "reached",
    cancelled = "cancelled",
    started = "started",
    completed = "completed",
    arriving = "arriving",
    accepted = "accepted",
    inProgress = "inProgress",
    searching = "searching"
}
export enum Variant_ok_notFound {
    ok = "ok",
    notFound = "notFound"
}
export enum VehicleType {
    Car = "Car",
    Premium = "Premium",
    Bike = "Bike",
    Rickshaw = "Rickshaw"
}
export interface backendInterface {
    addActivationCode(code: ActivationCode): Promise<ActivationCode>;
    addAdminLog(log: AdminLog): Promise<AdminLog>;
    addCustomer(customer: Customer): Promise<Customer>;
    addDriver(driver: Driver): Promise<Driver>;
    addPromoCode(promo: PromoCode): Promise<PromoCode>;
    addRide(ride: Ride): Promise<Ride>;
    getCustomer(id: CustomerId): Promise<Customer | null>;
    getDriver(id: DriverId): Promise<Driver | null>;
    getRide(id: RideId): Promise<Ride | null>;
    getWallet(driverId: DriverId): Promise<Wallet | null>;
    listActivationCodes(): Promise<Array<ActivationCode>>;
    listAdminLogs(): Promise<Array<AdminLog>>;
    listCustomers(): Promise<Array<Customer>>;
    listDrivers(): Promise<Array<Driver>>;
    listPromoCodes(): Promise<Array<PromoCode>>;
    listRides(): Promise<Array<Ride>>;
    listWallets(): Promise<Array<Wallet>>;
    updateCustomer(customer: Customer): Promise<Variant_ok_notFound>;
    updateDriver(driver: Driver): Promise<Variant_ok_notFound>;
    updatePromoCode(promo: PromoCode): Promise<Variant_ok_notFound>;
    updateRideStatus(id: RideId, status: RideStatus, completedAt: Timestamp | null, customerRating: bigint | null, driverRating: bigint | null, driverId: DriverId | null): Promise<Variant_ok_notFound>;
    updateWallet(wallet: Wallet): Promise<Wallet>;
    useActivationCode(code: string, usedBy: string): Promise<{
        __kind__: "ok";
        ok: ActivationCode;
    } | {
        __kind__: "alreadyUsed";
        alreadyUsed: null;
    } | {
        __kind__: "expired";
        expired: null;
    } | {
        __kind__: "notFound";
        notFound: null;
    }>;
}
