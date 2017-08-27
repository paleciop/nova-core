## Modules

<dl>
<dt><a href="#module_lib/constants">lib/constants</a> : <code>Object</code></dt>
<dd><p>Exports a frozen object with the project constants.</p>
</dd>
<dt><a href="#module_lib/contextProcessor">lib/contextProcessor</a></dt>
<dd></dd>
<dt><a href="#module_lib/utils">lib/utils</a> : <code>Object</code></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#hasMethod">hasMethod(obj, methodName)</a> ⇒ <code>boolean</code></dt>
<dd><p>Checks if <tt>obj</tt> has a method called <tt>methodName</tt>.</p>
</dd>
<dt><a href="#isValidContextProcessor">isValidContextProcessor(contextProcessor)</a> ⇒ <code>boolean</code></dt>
<dd><p>Checks if <tt>contextProcessor</tt> is valid.</p>
</dd>
<dt><a href="#unique">unique(value, index, self)</a> ⇒ <code>boolean</code></dt>
<dd><p>Filter used to check if <tt>value</tt> is unique in the array.</p>
</dd>
<dt><a href="#toSingleArray">toSingleArray(theArray, anArray)</a> ⇒</dt>
<dd><p>Concatenates <tt>theArray</tt> and <tt>anArray</tt></p>
</dd>
</dl>

<a name="module_lib/constants"></a>

## lib/constants : <code>Object</code>
Exports a frozen object with the project constants.

<a name="module_lib/contextProcessor"></a>

## lib/contextProcessor

* [lib/contextProcessor](#module_lib/contextProcessor)
    * [.priority](#module_lib/contextProcessor.priority)
    * [.name](#module_lib/contextProcessor.name)
    * [.categories](#module_lib/contextProcessor.categories)
    * [.accepts(categories)](#module_lib/contextProcessor.accepts) ⇒ <code>boolean</code>
    * [.process(contentModel)](#module_lib/contextProcessor.process) ⇒ <code>Promise.&lt;T&gt;</code>
    * [.extend(extendedProperties)](#module_lib/contextProcessor.extend) ⇒ <code>Object</code>

<a name="module_lib/contextProcessor.priority"></a>

### lib/contextProcessor.priority
Number from 0 to 100, the higher the number, the sooner it will get executed.

**Kind**: static property of [<code>lib/contextProcessor</code>](#module_lib/contextProcessor)  
<a name="module_lib/contextProcessor.name"></a>

### lib/contextProcessor.name
The context processor name.

**Kind**: static property of [<code>lib/contextProcessor</code>](#module_lib/contextProcessor)  
<a name="module_lib/contextProcessor.categories"></a>

### lib/contextProcessor.categories
An array of strings.

**Kind**: static property of [<code>lib/contextProcessor</code>](#module_lib/contextProcessor)  
<a name="module_lib/contextProcessor.accepts"></a>

### lib/contextProcessor.accepts(categories) ⇒ <code>boolean</code>
Checks if this Context Processor has to be executed based on the categories sent as arguments.

**Kind**: static method of [<code>lib/contextProcessor</code>](#module_lib/contextProcessor)  
**Returns**: <code>boolean</code> - True if any category sent as argument matches any of the Context Processor's categories; false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| categories | <code>Array</code> | The categories to check. |

<a name="module_lib/contextProcessor.process"></a>

### lib/contextProcessor.process(contentModel) ⇒ <code>Promise.&lt;T&gt;</code>
The 'core' of the Context Processor, modifies the <tt>contentModel</tt>.

**Kind**: static method of [<code>lib/contextProcessor</code>](#module_lib/contextProcessor)  
**Returns**: <code>Promise.&lt;T&gt;</code> - Optional return, only used if doing something async.  

| Param | Type | Description |
| --- | --- | --- |
| contentModel | <code>Object</code> | the Content Model to modify. |

<a name="module_lib/contextProcessor.extend"></a>

### lib/contextProcessor.extend(extendedProperties) ⇒ <code>Object</code>
Extend a Context Processor, sending the properties to override as arguments.

**Kind**: static method of [<code>lib/contextProcessor</code>](#module_lib/contextProcessor)  
**Returns**: <code>Object</code> - an instance of the new Context Processor.  

| Param | Type | Description |
| --- | --- | --- |
| extendedProperties | <code>Object</code> | the properties to override. |

**Example**  
```js
contextProcessor.extend({categories: ['test'], priority: 70, name: 'Test ContextProcessor'})
```
<a name="module_lib/utils"></a>

## lib/utils : <code>Object</code>
<a name="hasMethod"></a>

## hasMethod(obj, methodName) ⇒ <code>boolean</code>
Checks if <tt>obj</tt> has a method called <tt>methodName</tt>.

**Kind**: global function  
**Returns**: <code>boolean</code> - whether or not the object has the method specified.  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | the object to check. |
| methodName | <code>string</code> | the name of the method. |

**Example**  
```js
hasMethod(Object, 'create') // true
```
<a name="isValidContextProcessor"></a>

## isValidContextProcessor(contextProcessor) ⇒ <code>boolean</code>
Checks if <tt>contextProcessor</tt> is valid.

**Kind**: global function  
**Returns**: <code>boolean</code> - whether or not the context processor is valid.  

| Param | Type | Description |
| --- | --- | --- |
| contextProcessor | <code>Object</code> | the Context Processor to check. |

<a name="unique"></a>

## unique(value, index, self) ⇒ <code>boolean</code>
Filter used to check if <tt>value</tt> is unique in the array.

**Kind**: global function  
**Returns**: <code>boolean</code> - whether or not the value is unique.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The current value. |
| index | <code>number</code> | The current index. |
| self | <code>\*</code> | the array filter was called upon. |

**Example**  
```js
[1,2,2].filter(unique) // [1,2]
```
<a name="toSingleArray"></a>

## toSingleArray(theArray, anArray) ⇒
Concatenates <tt>theArray</tt> and <tt>anArray</tt>

**Kind**: global function  
**Returns**: The concatenation between the accumulated array and the current array.  

| Param | Type | Description |
| --- | --- | --- |
| theArray | <code>Array</code> | the accumulator. |
| anArray | <code>Array</code> | the current array. |

**Example**  
```js
[[1], [2]].reduce(toSingleArray) // [1,2]
```
