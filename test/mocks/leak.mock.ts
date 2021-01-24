import { LeakEntity } from '../../src/models/entities/leak.entity';

export function createLeakMock(options: Partial<LeakEntity> = {}): LeakEntity {
  const leak = new LeakEntity();

  leak.cpf = options?.cpf ?? '00000000000';
  leak.hasBasicInformation = options?.hasBasicInformation ?? getRandomBoolean();
  leak.hasEmail = options?.hasEmail ?? getRandomBoolean();
  leak.hasPhoneNumber = options?.hasPhoneNumber ?? getRandomBoolean();
  leak.hasAddress = options?.hasAddress ?? getRandomBoolean();
  leak.hasMosaic = options?.hasMosaic ?? getRandomBoolean();
  leak.hasOccupation = options?.hasOccupation ?? getRandomBoolean();
  leak.hasCreditScore = options?.hasCreditScore ?? getRandomBoolean();
  leak.hasRG = options?.hasRG ?? getRandomBoolean();
  leak.hasVoterTitleCard = options?.hasVoterTitleCard ?? getRandomBoolean();
  leak.hasEducationLevel = options?.hasEducationLevel ?? getRandomBoolean();
  leak.hasBusinessPartners = options?.hasBusinessPartners ?? getRandomBoolean();
  leak.hasSocialClassLevel = options?.hasSocialClassLevel ?? getRandomBoolean();
  leak.hasMaritalStatus = options?.hasMaritalStatus ?? getRandomBoolean();
  leak.hasEmployment = options?.hasEmployment ?? getRandomBoolean();
  leak.hasAffinityModel = options?.hasAffinityModel ?? getRandomBoolean();
  leak.hasAnalytical = options?.hasAnalytical ?? getRandomBoolean();
  leak.hasPurchasingPower = options?.hasPurchasingPower ?? getRandomBoolean();
  leak.hasPhoto = options?.hasPhoto ?? getRandomBoolean();
  leak.hasPublicServants = options?.hasPublicServants ?? getRandomBoolean();
  leak.isDebtor = options?.isDebtor ?? getRandomBoolean();
  leak.hasUniversity = options?.hasUniversity ?? getRandomBoolean();
  leak.hasAdvicers = options?.hasAdvicers ?? getRandomBoolean();
  leak.hasHouseholds = options?.hasHouseholds ?? getRandomBoolean();
  leak.hasLinkages = options?.hasLinkages ?? getRandomBoolean();
  leak.hasLinkedIn = options?.hasLinkedIn ?? getRandomBoolean();
  leak.hasIncome = options?.hasIncome ?? getRandomBoolean();
  leak.hasSalary = options?.hasSalary ?? getRandomBoolean();
  leak.hasDeceased = options?.hasDeceased ?? getRandomBoolean();
  leak.hasIRPF = options?.hasIRPF ?? getRandomBoolean();
  leak.hasINSS = options?.hasINSS ?? getRandomBoolean();
  leak.hasFGTS = options?.hasFGTS ?? getRandomBoolean();
  leak.hasCNS = options?.hasCNS ?? getRandomBoolean();
  leak.hasNIS = options?.hasNIS ?? getRandomBoolean();
  leak.hasPIS = options?.hasPIS ?? getRandomBoolean();
  leak.isInFamilyGrantProgram =
    options?.isInFamilyGrantProgram ?? getRandomBoolean();
  leak.hasChecksWithNoFunds =
    options?.hasChecksWithNoFunds ?? getRandomBoolean();
  leak.hasInternalRevenueService =
    options?.hasInternalRevenueService ?? getRandomBoolean();

  return leak;
}

function getRandomBoolean() {
  return Math.random() >= 0.5;
}
