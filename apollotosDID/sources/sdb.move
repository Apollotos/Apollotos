module sdb::curd {
    use std::error;
    use std::signer;
    use std::string;
    use aptos_std::simple_map::{Self, SimpleMap};

    //:!:>resource
    struct Sdb has key {
        sbt_map: SimpleMap<address, string::String>,
        c_sbt_map: SimpleMap<address, string::String>,
    }
    //<:!:resource

    const ENO_NF: u64 = 1;
    const ENO_EXIST: u64 = 2;

    public fun get_sbt(addr: address, user: address): string::String acquires Sdb {
        assert!(exists<Sdb>(addr), error::not_found(ENO_NF));
        let staking_contracts = &borrow_global<Sdb>(addr).sbt_map;
        simple_map::borrow(staking_contracts, &address)
    }

    public fun mint_sbt(addr: &signer, user: address, str: string::String) acquires Sdb {
        let addr_address = signer::address_of(staker);

        if (!exists<Sdb>(addr_address)) {
            move_to(addr, Sdb {
                sbt_map: simple_map::create<address, string::String>,
                c_sbt_map: simple_map::create<address, string::String>,
            });
        };

        let store = borrow_global_mut<Sdb>(addr_address);
        let map = &mut store.sbt_map;
        assert!(
            !simple_map::contains_key(addr_address, &user),
            error::already_exists(ENO_EXIST)
        );

        simple_map::add(addr_address, user, str);
    }


    public fun burn_sbt(addr: &signer, user: address) acquires Sdb {
        let addr_address = signer::address_of(staker);

        assert!(exists<Sdb>(addr_address), error::not_found(ENO_NF));

        let store = borrow_global_mut<Sdb>(addr_address);
        let map = &mut store.sbt_map;
        assert!(
            simple_map::contains_key(addr_address, &user),
            error::already_exists(ENO_EXIST)
        );

        simple_map::remove(addr_address, user);
    }

    public fun get_child_sbt(addr: address, user: address): string::String acquires Sdb {
        assert!(exists<Sdb>(addr), error::not_found(ENO_NF));
        let staking_contracts = &borrow_global<Sdb>(addr).c_sbt_map;
        simple_map::borrow(staking_contracts, &address)
    }

    public fun mint_child_sbt(addr: &signer, user: address, str: string::String) acquires Sdb {
        let addr_address = signer::address_of(staker);

        if (!exists<Sdb>(addr_address)) {
            move_to(addr, Sdb {
                sbt_map: simple_map::create<address, string::String>,
                c_sbt_map: simple_map::create<address, string::String>,
            });
        };

        let store = borrow_global_mut<Sdb>(addr_address);
        let map = &mut store.c_sbt_map;
        assert!(
            !simple_map::contains_key(addr_address, &user),
            error::already_exists(ENO_EXIST)
        );

        simple_map::add(addr_address, user, str);
    }


    public fun burn_child_sbt(addr: &signer, user: address) acquires Sdb {
        let addr_address = signer::address_of(staker);

        assert!(exists<Sdb>(addr_address), error::not_found(ENO_NF));

        let store = borrow_global_mut<Sdb>(addr_address);
        let map = &mut store.c_sbt_map;
        assert!(
            simple_map::contains_key(addr_address, &user),
            error::already_exists(ENO_EXIST)
        );

        simple_map::remove(addr_address, user);
    }
}