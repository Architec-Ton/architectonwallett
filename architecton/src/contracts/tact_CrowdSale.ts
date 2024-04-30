import {
  Cell,
  Slice,
  Address,
  Builder,
  beginCell,
  ComputeError,
  TupleItem,
  TupleReader,
  Dictionary,
  contractAddress,
  ContractProvider,
  Sender,
  Contract,
  ContractABI,
  ABIType,
  ABIGetter,
  ABIReceiver,
  TupleBuilder,
  DictionaryValue,
} from '@ton/core';

export type StateInit = {
  $$type: 'StateInit';
  code: Cell;
  data: Cell;
};

export function storeStateInit(src: StateInit) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeRef(src.code);
    b_0.storeRef(src.data);
  };
}

export function loadStateInit(slice: Slice) {
  let sc_0 = slice;
  let _code = sc_0.loadRef();
  let _data = sc_0.loadRef();
  return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
  let _code = source.readCell();
  let _data = source.readCell();
  return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
  let builder = new TupleBuilder();
  builder.writeCell(source.code);
  builder.writeCell(source.data);
  return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
    },
    parse: (src) => {
      return loadStateInit(src.loadRef().beginParse());
    },
  };
}

export type Context = {
  $$type: 'Context';
  bounced: boolean;
  sender: Address;
  value: bigint;
  raw: Cell;
};

export function storeContext(src: Context) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeBit(src.bounced);
    b_0.storeAddress(src.sender);
    b_0.storeInt(src.value, 257);
    b_0.storeRef(src.raw);
  };
}

export function loadContext(slice: Slice) {
  let sc_0 = slice;
  let _bounced = sc_0.loadBit();
  let _sender = sc_0.loadAddress();
  let _value = sc_0.loadIntBig(257);
  let _raw = sc_0.loadRef();
  return {
    $$type: 'Context' as const,
    bounced: _bounced,
    sender: _sender,
    value: _value,
    raw: _raw,
  };
}

function loadTupleContext(source: TupleReader) {
  let _bounced = source.readBoolean();
  let _sender = source.readAddress();
  let _value = source.readBigNumber();
  let _raw = source.readCell();
  return {
    $$type: 'Context' as const,
    bounced: _bounced,
    sender: _sender,
    value: _value,
    raw: _raw,
  };
}

function storeTupleContext(source: Context) {
  let builder = new TupleBuilder();
  builder.writeBoolean(source.bounced);
  builder.writeAddress(source.sender);
  builder.writeNumber(source.value);
  builder.writeSlice(source.raw);
  return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeContext(src)).endCell());
    },
    parse: (src) => {
      return loadContext(src.loadRef().beginParse());
    },
  };
}

export type SendParameters = {
  $$type: 'SendParameters';
  bounce: boolean;
  to: Address;
  value: bigint;
  mode: bigint;
  body: Cell | null;
  code: Cell | null;
  data: Cell | null;
};

export function storeSendParameters(src: SendParameters) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeBit(src.bounce);
    b_0.storeAddress(src.to);
    b_0.storeInt(src.value, 257);
    b_0.storeInt(src.mode, 257);
    if (src.body !== null && src.body !== undefined) {
      b_0.storeBit(true).storeRef(src.body);
    } else {
      b_0.storeBit(false);
    }
    if (src.code !== null && src.code !== undefined) {
      b_0.storeBit(true).storeRef(src.code);
    } else {
      b_0.storeBit(false);
    }
    if (src.data !== null && src.data !== undefined) {
      b_0.storeBit(true).storeRef(src.data);
    } else {
      b_0.storeBit(false);
    }
  };
}

export function loadSendParameters(slice: Slice) {
  let sc_0 = slice;
  let _bounce = sc_0.loadBit();
  let _to = sc_0.loadAddress();
  let _value = sc_0.loadIntBig(257);
  let _mode = sc_0.loadIntBig(257);
  let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
  let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
  let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
  return {
    $$type: 'SendParameters' as const,
    bounce: _bounce,
    to: _to,
    value: _value,
    mode: _mode,
    body: _body,
    code: _code,
    data: _data,
  };
}

function loadTupleSendParameters(source: TupleReader) {
  let _bounce = source.readBoolean();
  let _to = source.readAddress();
  let _value = source.readBigNumber();
  let _mode = source.readBigNumber();
  let _body = source.readCellOpt();
  let _code = source.readCellOpt();
  let _data = source.readCellOpt();
  return {
    $$type: 'SendParameters' as const,
    bounce: _bounce,
    to: _to,
    value: _value,
    mode: _mode,
    body: _body,
    code: _code,
    data: _data,
  };
}

function storeTupleSendParameters(source: SendParameters) {
  let builder = new TupleBuilder();
  builder.writeBoolean(source.bounce);
  builder.writeAddress(source.to);
  builder.writeNumber(source.value);
  builder.writeNumber(source.mode);
  builder.writeCell(source.body);
  builder.writeCell(source.code);
  builder.writeCell(source.data);
  return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
    },
    parse: (src) => {
      return loadSendParameters(src.loadRef().beginParse());
    },
  };
}

export type Deploy = {
  $$type: 'Deploy';
  queryId: bigint;
};

export function storeDeploy(src: Deploy) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2490013878, 32);
    b_0.storeUint(src.queryId, 64);
  };
}

export function loadDeploy(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2490013878) {
    throw Error('Invalid prefix');
  }
  let _queryId = sc_0.loadUintBig(64);
  return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
  let _queryId = source.readBigNumber();
  return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeDeploy(src)).endCell());
    },
    parse: (src) => {
      return loadDeploy(src.loadRef().beginParse());
    },
  };
}

export type DeployOk = {
  $$type: 'DeployOk';
  queryId: bigint;
};

export function storeDeployOk(src: DeployOk) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2952335191, 32);
    b_0.storeUint(src.queryId, 64);
  };
}

export function loadDeployOk(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2952335191) {
    throw Error('Invalid prefix');
  }
  let _queryId = sc_0.loadUintBig(64);
  return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
  let _queryId = source.readBigNumber();
  return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeDeployOk(src)).endCell());
    },
    parse: (src) => {
      return loadDeployOk(src.loadRef().beginParse());
    },
  };
}

export type FactoryDeploy = {
  $$type: 'FactoryDeploy';
  queryId: bigint;
  cashback: Address;
};

export function storeFactoryDeploy(src: FactoryDeploy) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1829761339, 32);
    b_0.storeUint(src.queryId, 64);
    b_0.storeAddress(src.cashback);
  };
}

export function loadFactoryDeploy(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1829761339) {
    throw Error('Invalid prefix');
  }
  let _queryId = sc_0.loadUintBig(64);
  let _cashback = sc_0.loadAddress();
  return {
    $$type: 'FactoryDeploy' as const,
    queryId: _queryId,
    cashback: _cashback,
  };
}

function loadTupleFactoryDeploy(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _cashback = source.readAddress();
  return {
    $$type: 'FactoryDeploy' as const,
    queryId: _queryId,
    cashback: _cashback,
  };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeAddress(source.cashback);
  return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
    },
    parse: (src) => {
      return loadFactoryDeploy(src.loadRef().beginParse());
    },
  };
}

export type ChangeOwner = {
  $$type: 'ChangeOwner';
  queryId: bigint;
  newOwner: Address;
};

export function storeChangeOwner(src: ChangeOwner) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2174598809, 32);
    b_0.storeUint(src.queryId, 64);
    b_0.storeAddress(src.newOwner);
  };
}

export function loadChangeOwner(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2174598809) {
    throw Error('Invalid prefix');
  }
  let _queryId = sc_0.loadUintBig(64);
  let _newOwner = sc_0.loadAddress();
  return {
    $$type: 'ChangeOwner' as const,
    queryId: _queryId,
    newOwner: _newOwner,
  };
}

function loadTupleChangeOwner(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _newOwner = source.readAddress();
  return {
    $$type: 'ChangeOwner' as const,
    queryId: _queryId,
    newOwner: _newOwner,
  };
}

function storeTupleChangeOwner(source: ChangeOwner) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeAddress(source.newOwner);
  return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
    },
    parse: (src) => {
      return loadChangeOwner(src.loadRef().beginParse());
    },
  };
}

export type ChangeOwnerOk = {
  $$type: 'ChangeOwnerOk';
  queryId: bigint;
  newOwner: Address;
};

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(846932810, 32);
    b_0.storeUint(src.queryId, 64);
    b_0.storeAddress(src.newOwner);
  };
}

export function loadChangeOwnerOk(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 846932810) {
    throw Error('Invalid prefix');
  }
  let _queryId = sc_0.loadUintBig(64);
  let _newOwner = sc_0.loadAddress();
  return {
    $$type: 'ChangeOwnerOk' as const,
    queryId: _queryId,
    newOwner: _newOwner,
  };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _newOwner = source.readAddress();
  return {
    $$type: 'ChangeOwnerOk' as const,
    queryId: _queryId,
    newOwner: _newOwner,
  };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeAddress(source.newOwner);
  return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
    },
    parse: (src) => {
      return loadChangeOwnerOk(src.loadRef().beginParse());
    },
  };
}

export type ReferralAddress = {
  $$type: 'ReferralAddress';
  referral: Address;
};

export function storeReferralAddress(src: ReferralAddress) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(282374089, 32);
    b_0.storeAddress(src.referral);
  };
}

export function loadReferralAddress(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 282374089) {
    throw Error('Invalid prefix');
  }
  let _referral = sc_0.loadAddress();
  return { $$type: 'ReferralAddress' as const, referral: _referral };
}

function loadTupleReferralAddress(source: TupleReader) {
  let _referral = source.readAddress();
  return { $$type: 'ReferralAddress' as const, referral: _referral };
}

function storeTupleReferralAddress(source: ReferralAddress) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.referral);
  return builder.build();
}

function dictValueParserReferralAddress(): DictionaryValue<ReferralAddress> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeReferralAddress(src)).endCell());
    },
    parse: (src) => {
      return loadReferralAddress(src.loadRef().beginParse());
    },
  };
}

type CrowdSale_init_args = {
  $$type: 'CrowdSale_init_args';
  unlockDate: bigint;
};

function initCrowdSale_init_args(src: CrowdSale_init_args) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeInt(src.unlockDate, 257);
  };
}

async function CrowdSale_init(unlockDate: bigint) {
  const __code = Cell.fromBase64(
    'te6ccgECHwEABdQAART/APSkE/S88sgLAQIBYgIDAurQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxVFNs88uCCyPhDAcx/AcoAVUBQRcsfEvQA9ADLHwEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbJ7VQcBAIBIBARBL7tou37AZIwf+BwIddJwh+VMCDXCx/eIMAAItdJwSGwjytb+EFvJBAjXwP4QW8kE18D2zx/+EFvJBNfA4IIB6EgoSJZchAjbW1t2zx/4CCCEBDUr8m64wIgghCUapi2ugwNBQYBXDDTHwGCEBDUr8m68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiDEHA3iOqDDTHwGCEJRqmLa68uCB0z8BMcgBghCv+Q9XWMsfyz/J+EIBcG3bPH/gIIIQgZ2+mbrjAsAAkTDjDXALCAkD1oFVroEBC/hBbyQQI18DJ1mBAQFBM/QKb6GUAdcAMJJbbeJus/L0+EFvJBAjXwP4QW8kE18DEGcQVxBHEDcQJ9s8+EFvJBNfAxBWEEUQNEEw2zx/+EFvJBNfA4IIB6EgoSJZchAjbW1t2zx/DAwNAu4w0x8BghCBnb6ZuvLggdM/+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBJsEhBGEDVGVts8MFFFyFmCEDJ7K0pQA8sfyz8BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyRA1RDD4QgF/bds8fwoLAqj5AYLw6yOZtmgND3keRL7q5oC1tnK20bDnQXCZQR6IOQZilga6jyz4QW8kECNfA/hBbyQTXwPbPH/4QW8kE18DgggHoSChIllyECNtbW3bPH/bMeAMDQAS+EJSEMcF8uCEATptbSJus5lbIG7y0IBvIgGRMuIQJHADBIBCUCPbPA0B9HAkggDDULuYMIIID0JAqQSOPCSCAMNQvJckgggHoSC7kXDimDCCCBbjYKkEjh8kgggHoSC8lySCCA9CQLuRcOKZMIIQdzWUAKkEkTHi4uIlgQELI4EBAUEz9ApvoZQB1wAwkltt4iBukjBwlSBu8tCA4oEBC1ESoBA3DgHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wAPADZBcIEBASFulVtZ9FkwmMgBzwBBM/RB4lAkoAEAmH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMwCASASEwIBIBYXAhG5eU2zzbPGxRgcFAIRuFHds82zxsUYHBUAPoEBC/hBbyQQI18DJVmBAQFBM/QKb6GUAdcAMJJbbeIAAiAA3bu9GCcFzsPV0srnsehOw51kqFG2aCcJ3WNS0rZHyzItOvLf3xYjmCcCBVwBuAZ2OUzlg6rkclssOCcJ2XTlqzTstzOg6WbZRm6KSCcPLnf6vmhegs5FqtCrsFsUqCcEDOdWnnFfnSULAdYW4mR7KAIBIBgZAgEgGhsCTbaMhBrpMCAhd15cEQQa4WFEECCf915aETBhN15cERtniqCbZ42KMBwdABGwr7tRNDSAAGAAdbJu40NWlwZnM6Ly9RbWNlMmkyTjF2NlRwNVN6b0R0cFY3cVRrU3ZWMkRZS1c2eDVMMXp3Nzl3MldBggAZ7tRNDUAfhj0gABji3TH/QE9ATTH/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgVFEMwbBXg+CjXCwqDCbry4ImBAQHXAAEB0ds8HgAugQELJQKBAQFBM/QKb6GUAdcAMJJbbeIAGG1t+EFvJBAjXwNwAQ=='
  );
  const __system = Cell.fromBase64(
    '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'
  );
  let builder = beginCell();
  builder.storeRef(__system);
  builder.storeUint(0, 1);
  initCrowdSale_init_args({ $$type: 'CrowdSale_init_args', unlockDate })(
    builder
  );
  const __data = builder.endCell();
  return { code: __code, data: __data };
}

const CrowdSale_errors: { [key: number]: { message: string } } = {
  2: { message: `Stack undeflow` },
  3: { message: `Stack overflow` },
  4: { message: `Integer overflow` },
  5: { message: `Integer out of expected range` },
  6: { message: `Invalid opcode` },
  7: { message: `Type check error` },
  8: { message: `Cell overflow` },
  9: { message: `Cell underflow` },
  10: { message: `Dictionary error` },
  13: { message: `Out of gas error` },
  32: { message: `Method ID not found` },
  34: { message: `Action is invalid or not supported` },
  37: { message: `Not enough TON` },
  38: { message: `Not enough extra-currencies` },
  128: { message: `Null reference exception` },
  129: { message: `Invalid serialization prefix` },
  130: { message: `Invalid incoming message` },
  131: { message: `Constraints error` },
  132: { message: `Access denied` },
  133: { message: `Contract stopped` },
  134: { message: `Invalid argument` },
  135: { message: `Code of a contract was not found` },
  136: { message: `Invalid address` },
  137: { message: `Masterchain support is not enabled for this contract` },
  21934: { message: `Referal don't has any  banks` },
};

const CrowdSale_types: ABIType[] = [
  {
    name: 'StateInit',
    header: null,
    fields: [
      { name: 'code', type: { kind: 'simple', type: 'cell', optional: false } },
      { name: 'data', type: { kind: 'simple', type: 'cell', optional: false } },
    ],
  },
  {
    name: 'Context',
    header: null,
    fields: [
      {
        name: 'bounced',
        type: { kind: 'simple', type: 'bool', optional: false },
      },
      {
        name: 'sender',
        type: { kind: 'simple', type: 'address', optional: false },
      },
      {
        name: 'value',
        type: { kind: 'simple', type: 'int', optional: false, format: 257 },
      },
      { name: 'raw', type: { kind: 'simple', type: 'slice', optional: false } },
    ],
  },
  {
    name: 'SendParameters',
    header: null,
    fields: [
      {
        name: 'bounce',
        type: { kind: 'simple', type: 'bool', optional: false },
      },
      {
        name: 'to',
        type: { kind: 'simple', type: 'address', optional: false },
      },
      {
        name: 'value',
        type: { kind: 'simple', type: 'int', optional: false, format: 257 },
      },
      {
        name: 'mode',
        type: { kind: 'simple', type: 'int', optional: false, format: 257 },
      },
      { name: 'body', type: { kind: 'simple', type: 'cell', optional: true } },
      { name: 'code', type: { kind: 'simple', type: 'cell', optional: true } },
      { name: 'data', type: { kind: 'simple', type: 'cell', optional: true } },
    ],
  },
  {
    name: 'Deploy',
    header: 2490013878,
    fields: [
      {
        name: 'queryId',
        type: { kind: 'simple', type: 'uint', optional: false, format: 64 },
      },
    ],
  },
  {
    name: 'DeployOk',
    header: 2952335191,
    fields: [
      {
        name: 'queryId',
        type: { kind: 'simple', type: 'uint', optional: false, format: 64 },
      },
    ],
  },
  {
    name: 'FactoryDeploy',
    header: 1829761339,
    fields: [
      {
        name: 'queryId',
        type: { kind: 'simple', type: 'uint', optional: false, format: 64 },
      },
      {
        name: 'cashback',
        type: { kind: 'simple', type: 'address', optional: false },
      },
    ],
  },
  {
    name: 'ChangeOwner',
    header: 2174598809,
    fields: [
      {
        name: 'queryId',
        type: { kind: 'simple', type: 'uint', optional: false, format: 64 },
      },
      {
        name: 'newOwner',
        type: { kind: 'simple', type: 'address', optional: false },
      },
    ],
  },
  {
    name: 'ChangeOwnerOk',
    header: 846932810,
    fields: [
      {
        name: 'queryId',
        type: { kind: 'simple', type: 'uint', optional: false, format: 64 },
      },
      {
        name: 'newOwner',
        type: { kind: 'simple', type: 'address', optional: false },
      },
    ],
  },
  {
    name: 'ReferralAddress',
    header: 282374089,
    fields: [
      {
        name: 'referral',
        type: { kind: 'simple', type: 'address', optional: false },
      },
    ],
  },
];

const CrowdSale_getters: ABIGetter[] = [
  {
    name: 'myBanksBalance',
    arguments: [],
    returnType: { kind: 'simple', type: 'int', optional: true, format: 257 },
  },
  {
    name: 'someoneBanksBalance',
    arguments: [
      {
        name: 'addr',
        type: { kind: 'simple', type: 'address', optional: false },
      },
    ],
    returnType: { kind: 'simple', type: 'int', optional: true, format: 257 },
  },
  {
    name: 'owner',
    arguments: [],
    returnType: { kind: 'simple', type: 'address', optional: false },
  },
];

const CrowdSale_receivers: ABIReceiver[] = [
  { receiver: 'internal', message: { kind: 'empty' } },
  { receiver: 'internal', message: { kind: 'text', text: 'buyBank' } },
  { receiver: 'internal', message: { kind: 'typed', type: 'ReferralAddress' } },
  { receiver: 'internal', message: { kind: 'typed', type: 'Deploy' } },
  { receiver: 'internal', message: { kind: 'typed', type: 'ChangeOwner' } },
];

export class CrowdSale implements Contract {
  static async init(unlockDate: bigint) {
    return await CrowdSale_init(unlockDate);
  }

  static async fromInit(unlockDate: bigint) {
    const init = await CrowdSale_init(unlockDate);
    const address = contractAddress(0, init);
    return new CrowdSale(address, init);
  }

  static fromAddress(address: Address) {
    return new CrowdSale(address);
  }

  readonly address: Address;
  readonly init?: { code: Cell; data: Cell };
  readonly abi: ContractABI = {
    types: CrowdSale_types,
    getters: CrowdSale_getters,
    receivers: CrowdSale_receivers,
    errors: CrowdSale_errors,
  };

  private constructor(address: Address, init?: { code: Cell; data: Cell }) {
    this.address = address;
    this.init = init;
  }

  async send(
    provider: ContractProvider,
    via: Sender,
    args: { value: bigint; bounce?: boolean | null | undefined },
    message: null | 'buyBank' | ReferralAddress | Deploy | ChangeOwner
  ) {
    let body: Cell | null = null;
    if (message === null) {
      body = new Cell();
    }
    if (message === 'buyBank') {
      body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
    }
    if (
      message &&
      typeof message === 'object' &&
      !(message instanceof Slice) &&
      message.$$type === 'ReferralAddress'
    ) {
      body = beginCell().store(storeReferralAddress(message)).endCell();
    }
    if (
      message &&
      typeof message === 'object' &&
      !(message instanceof Slice) &&
      message.$$type === 'Deploy'
    ) {
      body = beginCell().store(storeDeploy(message)).endCell();
    }
    if (
      message &&
      typeof message === 'object' &&
      !(message instanceof Slice) &&
      message.$$type === 'ChangeOwner'
    ) {
      body = beginCell().store(storeChangeOwner(message)).endCell();
    }
    if (body === null) {
      throw new Error('Invalid message type');
    }

    await provider.internal(via, { ...args, body: body });
  }

  async getMyBanksBalance(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get('myBanksBalance', builder.build())).stack;
    let result = source.readBigNumberOpt();
    return result;
  }

  async getSomeoneBanksBalance(provider: ContractProvider, addr: Address) {
    let builder = new TupleBuilder();
    builder.writeAddress(addr);
    let source = (await provider.get('someoneBanksBalance', builder.build()))
      .stack;
    let result = source.readBigNumberOpt();
    return result;
  }

  async getOwner(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get('owner', builder.build())).stack;
    let result = source.readAddress();
    return result;
  }
}
