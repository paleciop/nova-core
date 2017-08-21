## Modules

<dl>
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
