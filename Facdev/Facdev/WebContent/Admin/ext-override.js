Ext.define('Ext.data.TreeStoreOverride', {
    override: 'Ext.data.TreeStore',

    /**
    * @private
    * @param {Object[]} filters The filters array
    */
    applyFilters: function (filters) {
        var me = this,
            decoded = me.decodeFilters(filters),
            i = 0,
            length = decoded.length,
            node,
            visibleNodes = [],
            resultNodes = [],
            root = me.getRootNode(),
            flattened = me.tree.flatten(),
            items,
            item,
            fn;


        /**
        * @property {Ext.util.MixedCollection} snapshot
        * A pristine (unfiltered) collection of the records in this store. This is used to reinstate
        * records when a filter is removed or changed
        */
        me.snapshot = me.snapshot || me.getRootNode().copy(null, true);

        for (i = 0; i < length; i++) {
            me.filters.replace(decoded[i]);
        }


        //collect all the nodes that match the filter
        items = me.filters.items;
        length = items.length;
        for (i = 0; i < length; i++) {
            item = items[i];
            fn = item.filterFn || function (item) { return item.get(item.property) == item.value; };
            visibleNodes = Ext.Array.merge(visibleNodes, Ext.Array.filter(flattened, fn));
        }

        //collect the parents of the visible nodes so the tree has the corresponding branches
        length = visibleNodes.length;
        for (i = 0; i < length; i++) {
            node = visibleNodes[i];
            node.bubble(function (n) {
                if (n.parentNode) {
                    resultNodes.push(n.parentNode);
                } else {
                    return false;
                }
            });
        }
        visibleNodes = Ext.Array.merge(visibleNodes, resultNodes);

        //identify all the other nodes that should be removed (either they are not visible or are not a parent of a visible node)
        resultNodes = [];
        root.cascadeBy(function (n) {
            if (!Ext.Array.contains(visibleNodes, n)) {
                resultNodes.push(n);
            }
        });
        //we can't remove them during the cascade - pulling rug out ...
        length = resultNodes.length;
        for (i = 0; i < length; i++) {
            resultNodes[i].remove();
        }

        //necessary for async-loaded trees
        root.getOwnerTree().getView().refresh();
    }, //eof applyFilters

    //@inheritdoc
    filter: function (filters, value) {
        var nodes, nodeLength, i, filterFn;

        if (Ext.isString(filters)) {
            filters = {
                property: filters,
                value: value
            };
        }

        //find branch nodes that have not been loaded yet - this approach is in contrast to expanding all nodes recursively, which is unnecessary if some nodes are already loaded.
        filterFn = function (item) { return !item.isLeaf() && !(item.isLoading() || item.isLoaded()); };
        nodes = Ext.Array.filter(this.tree.flatten(), filterFn);
        nodeLength = nodes.length;
        
        if (nodeLength === 0) {
            this.applyFilters(filters);
        } else {
            for (i = 0; i < nodeLength; i++) {
                this.load({
                    node: nodes[i],
                    callback: function () {
                        nodeLength--;
                        if (nodeLength === 0) {
                            //start again & re-test for newly loaded nodes in case more branches exist
                            this.filter(filters, value);
                        }
                    },
                    scope: this
                });
            }
        }
    },
    clearFilter: function (suppressEvent) {
        var me = this;
        me.filters.clear();

        if (me.isFiltered()) {
            me.setRootNode(me.snapshot);
            delete me.snapshot;
        }
    },
    isFiltered: function () {
        var snapshot = this.snapshot;
        return !!snapshot && snapshot !== this.getRootNode();
    }
});

Ext.define('Ext.form.BasicFormOverride', {
    override: 'Ext.form.BasicForm',
    beforeSetafterLoad: function (data) {
        this.fireEvent('beforeSetafterLoad', data)
    }
});

Ext.define('Ext.form.FieldSetOverride', {
    override: 'Ext.form.FieldSet',
    initComponent: function () {
        var me = this;

        Ext.apply(this, {
            collapsible: true,
            border: '1 1 1 1',
            padding: '1'
        });

        this.callParent(arguments);
    }
});

Ext.define('Ext.form.action.Load', {
    extend: 'Ext.form.action.Action',
    requires: ['Ext.data.Connection'],
    alternateClassName: 'Ext.form.Action.Load',
    alias: 'formaction.load',
    type: 'load',

    /**
    * @private
    */
    run: function () {
        Ext.Ajax.request(Ext.apply(
            this.createCallback(),
            {
                method: this.getMethod(),
                url: this.getUrl(),
                headers: this.headers,
                params: this.getParams()
            }
        ));
    },

    /**
    * @private
    */
    onSuccess: function (response) {
        var result = this.processResponse(response),
            form = this.form;
        if (result === true || !result.success || !result.data) {
            this.failureType = Ext.form.action.Action.LOAD_FAILURE;
            form.afterAction(this, false);
            return;
        }
        form.clearInvalid();
        form.setValues(result.data);
        form.beforeSetafterLoad(result.data);
        form.afterAction(this, true);
    },

    /**
    * @private
    */
    handleResponse: function (response) {
        var reader = this.form.reader,
            rs, data;
        if (reader) {
            rs = reader.read(response);
            data = rs.records && rs.records[0] ? rs.records[0].data : null;
            return {
                success: rs.success,
                data: data
            };
        }
        return Ext.decode(response.responseText);
    }
});

// custom Vtype for vtype:'IPAddress'
Ext.apply(Ext.form.field.VTypes, {
    IPAddress: function (v) {
        return /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(v);
    },
    IPAddressText: 'Must be a numeric IP address',
    IPAddressMask: /[\d\.]/i
});

// custom Vtype for vtype:'Number'
Ext.apply(Ext.form.field.VTypes, {
    num: function (v) {
        var reg = /^[0-9]/;
        return reg.test(v);
    },
    numText: '必须为整数',
    numMask: /[0-9]/i
});

// custom Vtype for vtype:'Confrim Password'
Ext.apply(Ext.form.field.VTypes, {
    confirmpwd: function (val, field) {
        if (field.firstPassField) {
            return (val == field.firstPassField.getValue());
        }
        return true;
    },
    confirmpwdText: '两次输入的密码不一致!'
});