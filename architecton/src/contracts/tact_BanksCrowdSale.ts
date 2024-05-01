/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
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

type BanksCrowdSale_init_args = {
  $$type: 'BanksCrowdSale_init_args';
};

function initBanksCrowdSale_init_args(src: BanksCrowdSale_init_args) {
  return (builder: Builder) => {
    let b_0 = builder;
  };
}

async function BanksCrowdSale_init() {
  const __code = Cell.fromBase64(
    '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'
  );
  const __system = Cell.fromBase64(
    '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'
  );
  let builder = beginCell();
  builder.storeRef(__system);
  builder.storeUint(0, 1);
  initBanksCrowdSale_init_args({ $$type: 'BanksCrowdSale_init_args' })(builder);
  const __data = builder.endCell();
  return { code: __code, data: __data };
}

const BanksCrowdSale_errors: { [key: number]: { message: string } } = {
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
  12041: { message: `Referral doesn't have any banks` },
  12123: { message: `Sale stopped` },
  26611: { message: `Sale ended` },
  49469: { message: `Access denied` },
  50218: { message: `Bank's must be not zero` },
};

const BanksCrowdSale_types: ABIType[] = [
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

const BanksCrowdSale_getters: ABIGetter[] = [
  {
    name: 'Banks',
    arguments: [
      {
        name: 'addr',
        type: { kind: 'simple', type: 'address', optional: false },
      },
    ],
    returnType: { kind: 'simple', type: 'int', optional: true, format: 257 },
  },
  {
    name: 'TotalBanks',
    arguments: [],
    returnType: { kind: 'simple', type: 'int', optional: false, format: 257 },
  },
  {
    name: 'Bankers',
    arguments: [],
    returnType: {
      kind: 'dict',
      key: 'address',
      value: 'uint',
      valueFormat: 32,
    },
  },
  {
    name: 'TotalBankers',
    arguments: [],
    returnType: { kind: 'simple', type: 'int', optional: false, format: 257 },
  },
  {
    name: 'owner',
    arguments: [],
    returnType: { kind: 'simple', type: 'address', optional: false },
  },
];

const BanksCrowdSale_receivers: ABIReceiver[] = [
  { receiver: 'internal', message: { kind: 'empty' } },
  { receiver: 'internal', message: { kind: 'text', text: 'buyBank' } },
  { receiver: 'internal', message: { kind: 'text', text: 'stopSale' } },
  { receiver: 'internal', message: { kind: 'text', text: 'resumeSale' } },
  { receiver: 'internal', message: { kind: 'typed', type: 'ReferralAddress' } },
  { receiver: 'internal', message: { kind: 'typed', type: 'Deploy' } },
  { receiver: 'internal', message: { kind: 'typed', type: 'ChangeOwner' } },
];

export class BanksCrowdSale implements Contract {
  static async init() {
    return await BanksCrowdSale_init();
  }

  static async fromInit() {
    const init = await BanksCrowdSale_init();
    const address = contractAddress(0, init);
    return new BanksCrowdSale(address, init);
  }

  static fromAddress(address: Address) {
    return new BanksCrowdSale(address);
  }

  readonly address: Address;
  readonly init?: { code: Cell; data: Cell };
  readonly abi: ContractABI = {
    types: BanksCrowdSale_types,
    getters: BanksCrowdSale_getters,
    receivers: BanksCrowdSale_receivers,
    errors: BanksCrowdSale_errors,
  };

  private constructor(address: Address, init?: { code: Cell; data: Cell }) {
    this.address = address;
    this.init = init;
  }

  async send(
    provider: ContractProvider,
    via: Sender,
    args: { value: bigint; bounce?: boolean | null | undefined },
    message:
      | null
      | 'buyBank'
      | 'stopSale'
      | 'resumeSale'
      | ReferralAddress
      | Deploy
      | ChangeOwner
  ) {
    let body: Cell | null = null;
    if (message === null) {
      body = new Cell();
    }
    if (message === 'buyBank') {
      body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
    }
    if (message === 'stopSale') {
      body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
    }
    if (message === 'resumeSale') {
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

  async getBanks(provider: ContractProvider, addr: Address) {
    let builder = new TupleBuilder();
    builder.writeAddress(addr);
    let source = (await provider.get('Banks', builder.build())).stack;
    let result = source.readBigNumberOpt();
    return result;
  }

  async getTotalBanks(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get('TotalBanks', builder.build())).stack;
    let result = source.readBigNumber();
    return result;
  }

  async getBankers(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get('Bankers', builder.build())).stack;
    let result = Dictionary.loadDirect(
      Dictionary.Keys.Address(),
      Dictionary.Values.Uint(32),
      source.readCellOpt()
    );
    return result;
  }

  async getTotalBankers(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get('TotalBankers', builder.build())).stack;
    let result = source.readBigNumber();
    return result;
  }

  async getOwner(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get('owner', builder.build())).stack;
    let result = source.readAddress();
    return result;
  }
}
