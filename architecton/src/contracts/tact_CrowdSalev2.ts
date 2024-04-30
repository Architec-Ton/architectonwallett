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
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

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
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

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
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
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
        }
    }
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
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
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
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
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
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
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
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
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
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

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
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
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
        }
    }
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    queryId: bigint;
    newOwner: Address;
}

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
    if (sc_0.loadUint(32) !== 2174598809) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
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
        }
    }
}

export type ChangeOwnerOk = {
    $$type: 'ChangeOwnerOk';
    queryId: bigint;
    newOwner: Address;
}

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
    if (sc_0.loadUint(32) !== 846932810) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
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
        }
    }
}

export type ReferralAddress = {
    $$type: 'ReferralAddress';
    referral: Address;
}

export function storeReferralAddress(src: ReferralAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(282374089, 32);
        b_0.storeAddress(src.referral);
    };
}

export function loadReferralAddress(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 282374089) { throw Error('Invalid prefix'); }
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
        }
    }
}

export type BankDetail = {
    $$type: 'BankDetail';
    banks: bigint;
    updateDate: bigint;
    banksOfSec: bigint;
}

export function storeBankDetail(src: BankDetail) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.banks, 32);
        b_0.storeUint(src.updateDate, 32);
        b_0.storeInt(src.banksOfSec, 257);
    };
}

export function loadBankDetail(slice: Slice) {
    let sc_0 = slice;
    let _banks = sc_0.loadUintBig(32);
    let _updateDate = sc_0.loadUintBig(32);
    let _banksOfSec = sc_0.loadIntBig(257);
    return { $$type: 'BankDetail' as const, banks: _banks, updateDate: _updateDate, banksOfSec: _banksOfSec };
}

function loadTupleBankDetail(source: TupleReader) {
    let _banks = source.readBigNumber();
    let _updateDate = source.readBigNumber();
    let _banksOfSec = source.readBigNumber();
    return { $$type: 'BankDetail' as const, banks: _banks, updateDate: _updateDate, banksOfSec: _banksOfSec };
}

function storeTupleBankDetail(source: BankDetail) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.banks);
    builder.writeNumber(source.updateDate);
    builder.writeNumber(source.banksOfSec);
    return builder.build();
}

function dictValueParserBankDetail(): DictionaryValue<BankDetail> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeBankDetail(src)).endCell());
        },
        parse: (src) => {
            return loadBankDetail(src.loadRef().beginParse());
        }
    }
}

 type CrowdSalev2_init_args = {
    $$type: 'CrowdSalev2_init_args';
    unlockDate: bigint;
}

function initCrowdSalev2_init_args(src: CrowdSalev2_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.unlockDate, 257);
    };
}

async function CrowdSalev2_init(unlockDate: bigint) {
    const __code = Cell.fromBase64('te6ccgECJgEABtQAART/APSkE/S88sgLAQIBYgIDAurQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxVE9s88uCCyPhDAcx/AcoAVTBQNMsf9ACBAQHPAAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbJ7VQXGAIBIAQFAgEgBgcCASAQEQJNuRrSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjbPFUD2zxsQYFwgCASAJCgB0gQELJAJZ9AtvoZIwbd8gbpIwbY4Q0NMf0x+BAQHXAFUgbBNvA+IgbpIwcOAgbvLQgG8j+CNYoViooAIRtKO7Z5tnjYgwFwsCAUgMDQACIAJNreGQa6TAgIXdeXBEEGuFhRBAgn/deWhEwYTdeXBEbZ4qge2eNiDAFw4CeaxikGukwICF3XlwRBBrhYUQQIJ/3XloRMGE3XlwRG2eKoHtnjYgkDdJGDbMkDd5aEA3kbeB8RA3SRg270AXDwBogQELJAJZ9AtvoZIwbd8gbpIwbY4Q0NMf0x+BAQHXAFUgbBNvA+IgbpIwcOAgbvLQgG8jWwBMgQELJAJZ9AtvoZIwbd8gbpIwbY4Q0NMf0x+BAQHXAFUgbBNvA+IA3bu9GCcFzsPV0srnsehOw51kqFG2aCcJ3WNS0rZHyzItOvLf3xYjmCcCBVwBuAZ2OUzlg6rkclssOCcJ2XTlqzTstzOg6WbZRm6KSCcPLnf6vmhegs5FqtCrsFsUqCcEDOdWnnFfnSULAdYW4mR7KAIBSBITAgJxFBUAdbJu40NWlwZnM6Ly9RbU53TEY3YzFLQlF3RXNjRkM3QTJ2bXNYWXhkMUxZSEh6ZXgxcmNMeVpyRzJZggAA+i+7UTQ0gABgIPodds82zxsQYXFgACIgGe7UTQ1AH4Y9IAAY4t0x/0BIEBAdcA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBRDMGwU4Pgo1wsKgwm68uCJgQEB1wABAdHbPBkEuO2i7fsBkjB/4HAh10nCH5UwINcLH94gwAAi10nBIbCOnlv4QlIQxwWzjpL4QW8kECNfA/hBbyQTXwPbPDDef+AgghAQ1K/JuuMCIIIQlGqYtrrjAiCCEIGdvpm6IBobHAAWbfhBbyQQI18DcAECpDDTHwGCEBDUr8m68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiDH4QW8kECNfA/hBbyQTXwMQVhBGEDYQJts8EEUQNEEw+CPbPH8gIQFQMNMfAYIQlGqYtrry4IHTPwExyAGCEK/5D1dYyx/LP8n4QgFwbds8fx4D9o9xMNMfAYIQgZ2+mbry4IHTP/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgSbBJVMds8MFFDyFmCEDJ7K0pQA8sfyz8BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyUQw+EIBf23bPH/gwACRMOMNcB0eHwAS+EJSEMcF8uCEATptbSJus5lbIG7y0IBvIgGRMuIQJHADBIBCUCPbPCQBevkBgvDrI5m2aA0PeR5EvurmgLW2crbRsOdBcJlBHog5BmKWBrqOlfhBbyQQI18D+EFvJBNfA9s8MH/bMeAgA+CCCJiWgCSCAMNQvJYwggjk4cDeJIIIB6EgvJYwggkxLQDeJIIID0JAvJYwggnJw4DeXKkEUgKoEqEQNkVGU1T4I9s8JsIAjo4Vf1AHchAjbW1t2zwQNJI1NeL4J28QghAdzWUAoYIQBfXhALzjAFUhISQiAdQlgQELJFn0C2+hkjBt3yBukjBtjhDQ0x/TH4EBAdcAVSBsE28D4iBukzBwXJcgbvLQgG8j4oEBC1NToFJUoSSoEqAUyFUgUCPLH8sfgQEBzwDJR3BSQCBulTBZ9FkwlEEz9BPiUUGgyFADIwEsf/gnbxCCEB3NZQChJVlyECNtbW3bPCQAfCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgWgUATLH8nIgljAAAAAAAAAAAAAAAABActnzMlw+wASAcrIcQHKAVAHAcoAcAHKAlAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAP6AnABymgjbrORf5MkbrPilzMzAXABygDjDSFus5x/AcoAASBu8tCAAcyVMXABygDiyQH7ACUAmH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMw=');
    const __system = Cell.fromBase64('te6cckECKAEABt4AAQHAAQEFoQ/jAgEU/wD0pBP0vPLICwMCAWIYBAIBIA0FAgEgDAYCAUgIBwB1sm7jQ1aXBmczovL1FtTndMRjdjMUtCUXdFc2NGQzdBMnZtc1hZeGQxTFlISHpleDFyY0x5WnJHMlmCACAnELCQIPodds82zxsQYmCgACIgAPovu1E0NIAAYA3bu9GCcFzsPV0srnsehOw51kqFG2aCcJ3WNS0rZHyzItOvLf3xYjmCcCBVwBuAZ2OUzlg6rkclssOCcJ2XTlqzTstzOg6WbZRm6KSCcPLnf6vmhegs5FqtCrsFsUqCcEDOdWnnFfnSULAdYW4mR7KAIBIBYOAgEgFA8CAUgSEAJ5rGKQa6TAgIXdeXBEEGuFhRBAgn/deWhEwYTdeXBEbZ4qge2eNiCQN0kYNsyQN3loQDeRt4HxEDdJGDbvQCYRAEyBAQskAln0C2+hkjBt3yBukjBtjhDQ0x/TH4EBAdcAVSBsE28D4gJNreGQa6TAgIXdeXBEEGuFhRBAgn/deWhEwYTdeXBEbZ4qge2eNiDAJhMAaIEBCyQCWfQLb6GSMG3fIG6SMG2OENDTH9MfgQEB1wBVIGwTbwPiIG6SMHDgIG7y0IBvI1sCEbSju2ebZ42IMCYVAAIgAk25GtINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiNs8VQPbPGxBgmFwB0gQELJAJZ9AtvoZIwbd8gbpIwbY4Q0NMf0x+BAQHXAFUgbBNvA+IgbpIwcOAgbvLQgG8j+CNYoViooALq0AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8VRPbPPLggsj4QwHMfwHKAFUwUDTLH/QAgQEBzwABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8Wye1UJhkEuO2i7fsBkjB/4HAh10nCH5UwINcLH94gwAAi10nBIbCOnlv4QlIQxwWzjpL4QW8kECNfA/hBbyQTXwPbPDDef+AgghAQ1K/JuuMCIIIQlGqYtrrjAiCCEIGdvpm6IB8dGgP2j3Ew0x8BghCBnb6ZuvLggdM/+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBJsElUx2zwwUUPIWYIQMnsrSlADyx/LPwEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbJRDD4QgF/bds8f+DAAJEw4w1wHB4bAXr5AYLw6yOZtmgND3keRL7q5oC1tnK20bDnQXCZQR6IOQZilga6jpX4QW8kECNfA/hBbyQTXwPbPDB/2zHgIAAS+EJSEMcF8uCEAVAw0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zx/HgE6bW0ibrOZWyBu8tCAbyIBkTLiECRwAwSAQlAj2zwiAqQw0x8BghAQ1K/JuvLggfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4Igx+EFvJBAjXwP4QW8kE18DEFYQRhA2ECbbPBBFEDRBMPgj2zx/ICQD4IIImJaAJIIAw1C8ljCCCOThwN4kgggHoSC8ljCCCTEtAN4kgggPQkC8ljCCCcnDgN5cqQRSAqgSoRA2RUZTVPgj2zwmwgCOjhV/UAdyECNtbW3bPBA0kjU14vgnbxCCEB3NZQChghAF9eEAvOMAVSEkIiEBLH/4J28QghAdzWUAoSVZchAjbW1t2zwiAcrIcQHKAVAHAcoAcAHKAlAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAP6AnABymgjbrORf5MkbrPilzMzAXABygDjDSFus5x/AcoAASBu8tCAAcyVMXABygDiyQH7ACMAmH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMwB1CWBAQskWfQLb6GSMG3fIG6SMG2OENDTH9MfgQEB1wBVIGwTbwPiIG6TMHBclyBu8tCAbyPigQELU1OgUlShJKgSoBTIVSBQI8sfyx+BAQHPAMlHcFJAIG6VMFn0WTCUQTP0E+JRQaDIUAMlAHwg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYFoFAEyx/JyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAEgGe7UTQ1AH4Y9IAAY4t0x/0BIEBAdcA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBRDMGwU4Pgo1wsKgwm68uCJgQEB1wABAdHbPCcAFm34QW8kECNfA3ABOB6teA==');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initCrowdSalev2_init_args({ $$type: 'CrowdSalev2_init_args', unlockDate })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const CrowdSalev2_errors: { [key: number]: { message: string } } = {
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
}

const CrowdSalev2_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ReferralAddress","header":282374089,"fields":[{"name":"referral","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"BankDetail","header":null,"fields":[{"name":"banks","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"updateDate","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"banksOfSec","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
]

const CrowdSalev2_getters: ABIGetter[] = [
    {"name":"Banker","arguments":[{"name":"addr","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"BankDetail","optional":true}},
    {"name":"Banks","arguments":[{"name":"addr","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"Coins","arguments":[{"name":"addr","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"Accounts","arguments":[],"returnType":{"kind":"dict","key":"address","value":"BankDetail","valueFormat":"ref"}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

const CrowdSalev2_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"empty"}},
    {"receiver":"internal","message":{"kind":"text","text":"buyBank"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ReferralAddress"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ChangeOwner"}},
]

export class CrowdSalev2 implements Contract {
    
    static async init(unlockDate: bigint) {
        return await CrowdSalev2_init(unlockDate);
    }
    
    static async fromInit(unlockDate: bigint) {
        const init = await CrowdSalev2_init(unlockDate);
        const address = contractAddress(0, init);
        return new CrowdSalev2(address, init);
    }
    
    static fromAddress(address: Address) {
        return new CrowdSalev2(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  CrowdSalev2_types,
        getters: CrowdSalev2_getters,
        receivers: CrowdSalev2_receivers,
        errors: CrowdSalev2_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: null | 'buyBank' | ReferralAddress | Deploy | ChangeOwner) {
        
        let body: Cell | null = null;
        if (message === null) {
            body = new Cell();
        }
        if (message === 'buyBank') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ReferralAddress') {
            body = beginCell().store(storeReferralAddress(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ChangeOwner') {
            body = beginCell().store(storeChangeOwner(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getBanker(provider: ContractProvider, addr: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(addr);
        let source = (await provider.get('Banker', builder.build())).stack;
        const result_p = source.readTupleOpt();
        const result = result_p ? loadTupleBankDetail(result_p) : null;
        return result;
    }
    
    async getBanks(provider: ContractProvider, addr: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(addr);
        let source = (await provider.get('Banks', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getCoins(provider: ContractProvider, addr: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(addr);
        let source = (await provider.get('Coins', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getAccounts(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('Accounts', builder.build())).stack;
        let result = Dictionary.loadDirect(Dictionary.Keys.Address(), dictValueParserBankDetail(), source.readCellOpt());
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}