export interface VillageAgent {
  success: boolean;
  count: number;
  villageAgents: object;
}

export interface MasterAgent {
  success: boolean;
  count: number;
  villageAgents: object;
}

export interface InputSupplier {
  success: boolean;
  count: number;
  inputSuppliers: object;
}

export interface Offtaker {
  success: boolean;
  count: number;
  offtaker: object;
}

export interface DevtPartner {
  success: boolean;
  count: number;
  devtPartners: object;
}

export interface TopDistrict {
  success: boolean;
  count: number;
  topDistricts: object;
}
export interface ActivitySummary {
  success: boolean;
  inputOrders: number;
  acresPlanted: number;
  soilTestAcreage: number;
  gardenMapped: number;
}

export interface TotalAcreage {
  success: boolean;
  totalAcreage: number;
}

export interface TotalPayment {
  success: boolean;
  totalPayment: number;
}

export interface TwitterReport {
  success: boolean;
  data: object;
}

export interface FacebookReport {
  success: boolean;
  data: object;
}

export interface YoutubeReport {
  success: boolean;
  data: object;
}
export interface TopProduce {
  success: boolean;
  count: number;
  topProduce: object;
}

export interface ActiveUsers {
  success: boolean;
  allUsersCount: number;
  activeUsersCount: number;
}

export interface ActiveMobileUsers {
  success: boolean;
  allMobileUsersCount: number;
  activeMobileUsersCount: number;
}

export interface TopPerformingMasterAgents {
  success: boolean;
  data: Array<object>;
}

export interface TopPerformingVillageAgents {
  success: boolean;
  data: Array<object>;
}

export interface TopPerformingAgents {
  success: boolean;
  data: Array<object>;
}

export interface TopPerformingDistricts {
  success: boolean;
  data: Array<object>;
}

export interface FarmersAgentsOrderStatistics {
  success: boolean;
  data: Array<object>;
}

export interface FilterData {
  success: boolean;
  message: string;
  data: Array<object>;
}
export interface DiagnosisData {
  success: boolean;
  data: Array<object>;
}
export interface NumberOfVisitors {
  success: boolean;
  visitorsCount: number;
}
export interface Inputs {
  success: boolean;
  data: object;
}
