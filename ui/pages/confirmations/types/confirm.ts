import { ApprovalControllerState } from '@metamask/approval-controller';
import {
  TransactionMeta,
  TransactionType,
} from '@metamask/transaction-controller';

export type TypedSignDataV1Type = {
  name: string;
  value: string;
  type: string;
}[];

export type SecurityAlertResponse = {
  reason: string;
  features?: string[];
  result_type: string;
  providerRequestsCount?: Record<string, number>;
  securityAlertId?: string;
};

export type SignatureRequestType = {
  chainId?: string;
  id: string;
  msgParams?: {
    from: string;
    origin: string;
    data: string | TypedSignDataV1Type;
    version?: string;
    signatureMethod?: string;
    siwe?: {
      isSIWEMessage: boolean;
      parsedMessage: null | {
        domain: string;
        address: string;
        statement: string;
        uri: string;
        version: string;
        chainId: number;
        nonce: string;
        issuedAt: string;
        requestId?: string;
        resources?: string[];
      };
    };
  };
  type: TransactionType;
  custodyId?: string;
  securityAlertResponse?: SecurityAlertResponse;
};

export type Confirmation = SignatureRequestType | TransactionMeta;

export type ConfirmMetamaskState = {
  confirm: {
    currentConfirmation?: Confirmation;
    isScrollToBottomNeeded?: boolean;
  };
  metamask: {
    pendingApprovals: ApprovalControllerState['pendingApprovals'];
    approvalFlows: ApprovalControllerState['approvalFlows'];
    signatureSecurityAlertResponses?: Record<string, SecurityAlertResponse>;
  };
};
