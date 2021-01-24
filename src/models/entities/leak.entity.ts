import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LeakEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 11 })
  cpf: string;

  @Column()
  hasBasicInformation: boolean;

  @Column()
  hasEmail: boolean;

  @Column()
  hasPhoneNumber: boolean;

  @Column()
  hasAddress: boolean;

  @Column()
  hasMosaic: boolean;

  @Column()
  hasOccupation: boolean;

  @Column()
  hasCreditScore: boolean;

  @Column()
  hasRG: boolean;

  @Column()
  hasVoterTitleCard: boolean; // titulo de eleitor

  @Column()
  hasEducationLevel: boolean;

  @Column()
  hasBusinessPartners: boolean;

  @Column()
  hasInternalRevenueService: boolean; // receita federal

  @Column()
  hasSocialClassLevel: boolean;

  @Column()
  hasMaritalStatus: boolean;

  @Column()
  hasEmployment: boolean;

  @Column()
  hasAffinityModel: boolean;

  @Column()
  hasAnalytical: boolean;

  @Column()
  hasPurchasingPower: boolean;

  @Column()
  hasPhoto: boolean;

  @Column()
  hasPublicServants: boolean;

  @Column()
  hasChecksWithNoFunds: boolean;

  @Column()
  isDebtor: boolean;

  @Column()
  isInFamilyGrantProgram: boolean; // bolsa família

  @Column()
  hasUniversity: boolean;

  @Column()
  hasAdvicers: boolean;

  @Column()
  hasHouseholds: boolean;

  @Column()
  hasLinkages: boolean;

  @Column()
  hasLinkedIn: boolean;

  @Column()
  hasSalary: boolean;

  @Column()
  hasIncome: boolean;

  @Column()
  hasDeceased: boolean;

  @Column()
  hasIRPF: boolean;

  @Column()
  hasINSS: boolean;

  @Column()
  hasFGTS: boolean;

  @Column()
  hasCNS: boolean;

  @Column()
  hasNIS: boolean;

  @Column()
  hasPIS: boolean;
}
