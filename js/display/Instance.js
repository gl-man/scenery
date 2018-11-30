define(function(e){"use strict";var a=e("PHET_CORE/arrayRemove"),S=e("SCENERY/display/ChangeInterval"),n=e("PHET_CORE/cleanArray"),L=e("SCENERY/display/Drawable"),r=e("AXON/Events"),h=e("SCENERY/display/Fittability"),s=e("PHET_CORE/inherit"),t=e("PHET_CORE/Poolable"),l=e("SCENERY/display/RelativeTransform"),v=e("SCENERY/display/Renderer"),o=e("SCENERY/scenery"),c=e("SCENERY/util/Util"),d=1,C=v.createOrderBitmask(v.bitmaskSVG,v.bitmaskCanvas,v.bitmaskDOM,v.bitmaskWebGL);function g(e,s,t,i){r.call(this),this.active=!1,this.initialize(e,s,t,i)}return o.register("Instance",g),s(r,g,{initialize:function(e,s,t,i){return assert&&assert(!this.active,"We should never try to initialize an already active object"),s.setImmutable(),this.id=this.id||d++,this.isWebGLSupported=e._allowWebGL&&c.isWebGLSupported,this.relativeTransform=this.relativeTransform||new l(this),this.fittability=this.fittability||new h(this),this.visible=!0,this.relativeVisible=!0,this.selfVisible=!0,this.visibilityDirty=!0,this.childVisibilityDirty=!0,this.branchIndexMap={},this.branchIndexReferences=n(this.branchIndexReferences),this.addRemoveCounter=0,this.stitchChangeFrame=e._frameId,this.stitchChangeBefore=0,this.stitchChangeAfter=0,this.stitchChangeOnChildren=0,this.stitchChangeIncluded=!1,this.childInsertedListener=this.childInsertedListener||this.onChildInserted.bind(this),this.childRemovedListener=this.childRemovedListener||this.onChildRemoved.bind(this),this.childrenReorderedListener=this.childrenReorderedListener||this.onChildrenReordered.bind(this),this.visibilityListener=this.visibilityListener||this.onVisibilityChange.bind(this),this.markRenderStateDirtyListener=this.markRenderStateDirtyListener||this.markRenderStateDirty.bind(this),this.cleanInstance(e,s),this.node.addInstance(this),this.externalReferenceCount=0,this.stateless=!0,this.isDisplayRoot=t,this.isSharedCanvasCacheRoot=i,this.preferredRenderers=0,this.isUnderCanvasCache=i,this.isBackbone=!1,this.isTransformed=!1,this.isVisibilityApplied=!1,this.isInstanceCanvasCache=!1,this.isSharedCanvasCachePlaceholder=!1,this.isSharedCanvasCacheSelf=i,this.selfRenderer=0,this.groupRenderer=0,this.sharedCacheRenderer=0,this.renderStateDirtyFrame=e._frameId,this.skipPruningFrame=e._frameId,sceneryLog&&sceneryLog.Instance&&sceneryLog.Instance("initialized "+this.toString()),this.active=!0,this},cleanInstance:function(e,s){this.display=e,this.trail=s,this.node=s?s.lastNode():null,this.parent=null,this.oldParent=null,this.children=n(this.children),this.sharedCacheInstance=null,this.relativeTransform.initialize(e,s),this.fittability.initialize(e,s),this.instanceRemovalCheckList=n(this.instanceRemovalCheckList),this.selfDrawable=null,this.groupDrawable=null,this.sharedCacheDrawable=null,this.firstDrawable=null,this.lastDrawable=null,this.firstInnerDrawable=null,this.lastInnerDrawable=null,this.svgGroups=n(this.svgGroups),this.cleanSyncTreeResults()},cleanSyncTreeResults:function(){this.beforeStableIndex=this.children.length,this.afterStableIndex=-1,this.firstChangeInterval=null,this.lastChangeInterval=null,this.incompatibleStateChange=!1,this.groupChanged=!1,this.cascadingStateChange=!1,this.anyStateChange=!1},updateRenderingState:function(){sceneryLog&&sceneryLog.Instance&&sceneryLog.Instance("updateRenderingState "+this.toString()+(this.stateless?" (stateless)":"")),sceneryLog&&sceneryLog.Instance&&sceneryLog.push(),sceneryLog&&sceneryLog.Instance&&sceneryLog.Instance("old: "+this.getStateString());var e=this.isBackbone,s=this.isTransformed,t=this.isVisibilityApplied,i=this.isInstanceCanvasCache,a=this.isSharedCanvasCacheSelf,n=this.isSharedCanvasCachePlaceholder,r=this.isUnderCanvasCache,h=this.selfRenderer,l=this.groupRenderer,o=this.sharedCacheRenderer,c=this.preferredRenderers;this.isBackbone=!1,this.isTransformed=!1,this.isVisibilityApplied=!1,this.isInstanceCanvasCache=!1,this.isSharedCanvasCacheSelf=!1,this.isSharedCanvasCachePlaceholder=!1,this.selfRenderer=0,this.groupRenderer=0,this.sharedCacheRenderer=0;var d=this.node._hints;this.isUnderCanvasCache=this.isSharedCanvasCacheRoot||!!this.parent&&(this.parent.isUnderCanvasCache||this.parent.isInstanceCanvasCache||this.parent.isSharedCanvasCacheSelf),this.preferredRenderers=this.parent?this.parent.preferredRenderers:C,d.renderer&&(this.preferredRenderers=v.pushOrderBitmask(this.preferredRenderers,d.renderer));var g=this.node.hasClipArea(),y=1!==this.node.opacity||d.usesOpacity,f=d.requireElement||d.cssTransform||d.layerSplit,b=this.isDisplayRoot||!this.isUnderCanvasCache&&f,u=!b&&(y||g)&&(this.node._rendererSummary.isSubtreeRenderedExclusivelySVG(this.preferredRenderers)||this.node._rendererSummary.isSubtreeRenderedExclusivelyCanvas(this.preferredRenderers));if(!u&&(b||y||g)?(this.isBackbone=!0,this.isVisibilityApplied=!0,this.isTransformed=this.isDisplayRoot||!!d.cssTransform,this.groupRenderer=v.bitmaskDOM):!u&&(y||g||d.canvasCache)&&(assert&&assert(this.node._rendererSummary.isSingleCanvasSupported(),"hints.canvasCache provided, but not all node contents can be rendered with Canvas under "+this.node.constructor.name),d.singleCache?this.isSharedCanvasCacheRoot?(this.isSharedCanvasCacheSelf=!0,this.sharedCacheRenderer=this.isWebGLSupported?v.bitmaskWebGL:v.bitmaskCanvas):(assert&&assert(this.node._rendererSummary.areBoundsValid(),"hints.singleCache provided, but not all node contents have valid bounds under "+this.node.constructor.name),this.isSharedCanvasCachePlaceholder=!0):(this.isInstanceCanvasCache=!0,this.isUnderCanvasCache=!0,this.groupRenderer=this.isWebGLSupported?v.bitmaskWebGL:v.bitmaskCanvas)),this.node.isPainted())if(this.isUnderCanvasCache)this.selfRenderer=v.bitmaskCanvas;else{var p=this.node._rendererBitmask;if(!this.isWebGLSupported)p^=p&v.bitmaskWebGL;this.selfRenderer=p&v.bitmaskOrder(this.preferredRenderers,0)||p&v.bitmaskOrder(this.preferredRenderers,1)||p&v.bitmaskOrder(this.preferredRenderers,2)||p&v.bitmaskOrder(this.preferredRenderers,3)||p&v.bitmaskSVG||p&v.bitmaskCanvas||p&v.bitmaskDOM||p&v.bitmaskWebGL||0,assert&&assert(this.selfRenderer,"setSelfRenderer failure?")}this.groupChanged=e!==this.isBackbone||i!==this.isInstanceCanvasCache||a!==this.isSharedCanvasCacheSelf,this.cascadingStateChange=r!==this.isUnderCanvasCache||c!==this.preferredRenderers,this.incompatibleStateChange=this.isTransformed!==s||this.isSharedCanvasCachePlaceholder!==n,this.anyStateChange=this.groupChanged||this.cascadingStateChange||this.incompatibleStateChange||h!==this.selfRenderer||l!==this.groupRenderer||o!==this.sharedCacheRenderer,t!==this.isVisibilityApplied&&(this.visibilityDirty=!0,this.parent&&this.parent.markChildVisibilityDirty()),this.fittability.checkSelfFittability(),sceneryLog&&sceneryLog.Instance&&sceneryLog.Instance("new: "+this.getStateString()),sceneryLog&&sceneryLog.Instance&&sceneryLog.pop()},getStateString:function(){return"S[ "+(this.isDisplayRoot?"displayRoot ":"")+(this.isBackbone?"backbone ":"")+(this.isInstanceCanvasCache?"instanceCache ":"")+(this.isSharedCanvasCachePlaceholder?"sharedCachePlaceholder ":"")+(this.isSharedCanvasCacheSelf?"sharedCacheSelf ":"")+(this.isTransformed?"TR ":"")+(this.isVisibilityApplied?"VIS ":"")+(this.selfRenderer?this.selfRenderer.toString(16):"-")+","+(this.groupRenderer?this.groupRenderer.toString(16):"-")+","+(this.sharedCacheRenderer?this.sharedCacheRenderer.toString(16):"-")+" "+"]"},baseSyncTree:function(){assert&&assert(this.isDisplayRoot,"baseSyncTree() should only be called on the root instance"),sceneryLog&&sceneryLog.Instance&&sceneryLog.Instance("-------- START baseSyncTree "+this.toString()+" --------"),this.syncTree(),sceneryLog&&sceneryLog.Instance&&sceneryLog.Instance("-------- END baseSyncTree "+this.toString()+" --------"),this.cleanSyncTreeResults()},syncTree:function(){sceneryLog&&sceneryLog.Instance&&sceneryLog.Instance("syncTree "+this.toString()+" "+this.getStateString()+(this.stateless?" (stateless)":"")),sceneryLog&&sceneryLog.Instance&&sceneryLog.push(),sceneryLog&&o.isLoggingPerformance()&&this.display.perfSyncTreeCount++,assert&&assert(!this.parent||!this.parent.stateless,"We should not have a stateless parent instance");var e=this.stateless;if(e||this.parent&&this.parent.cascadingStateChange||this.renderStateDirtyFrame===this.display._frameId?this.updateRenderingState():assertSlow&&(this.updateRenderingState(),assertSlow(!this.anyStateChange)),!e&&this.incompatibleStateChange)return sceneryLog&&sceneryLog.Instance&&sceneryLog.Instance("incompatible instance "+this.toString()+" "+this.getStateString()+", aborting"),sceneryLog&&sceneryLog.Instance&&sceneryLog.pop(),!1;if(this.stateless=!1,assert&&assert(!e||0===this.children.length,"We should not have child instances on an instance without state"),e&&(this.isTransformed&&this.display.markTransformRootDirty(this,!0),this.attachNodeListeners()),this.isSharedCanvasCachePlaceholder)this.sharedSyncTree();else if(e||this.skipPruningFrame===this.display._frameId||this.anyStateChange){this.prepareChildInstances(e);var s=this.firstDrawable,t=this.lastDrawable,i=this.firstInnerDrawable,a=this.lastInnerDrawable,n=this.updateSelfDrawable();this.localSyncTree(n),assertSlow&&this.auditChangeIntervals(i,a,this.firstInnerDrawable,this.lastInnerDrawable),this.groupSyncTree(e),assertSlow&&this.auditChangeIntervals(s,t,this.firstDrawable,this.lastDrawable)}else sceneryLog&&sceneryLog.Instance&&sceneryLog.Instance("pruned");return sceneryLog&&sceneryLog.Instance&&sceneryLog.pop(),!0},localSyncTree:function(e){var s=this.display._frameId,t=this.selfDrawable,i=t;assert&&assert(null===this.firstChangeInterval&&null===this.lastChangeInterval,"sanity checks that cleanSyncTreeResults were called");var a=null;e&&(sceneryLog&&sceneryLog.ChangeInterval&&sceneryLog.ChangeInterval("self"),sceneryLog&&sceneryLog.ChangeInterval&&sceneryLog.push(),a=S.newForDisplay(null,null,this.display),sceneryLog&&sceneryLog.ChangeInterval&&sceneryLog.pop());for(var n=a,r=e?null:this.selfDrawable,h=0;h<this.children.length;h++){var l=this.children[h];l.syncTree()||(l=this.updateIncompatibleChildInstance(l,h)).syncTree();var o=l.shouldIncludeInParentDrawables();o&&l.firstDrawable&&(i?L.connectDrawables(i,l.firstDrawable,this.display):t=l.firstDrawable,i=l.lastDrawable),sceneryLog&&sceneryLog.ChangeInterval&&sceneryLog.ChangeInterval("changes for "+l.toString()+" in "+this.toString()),sceneryLog&&sceneryLog.ChangeInterval&&sceneryLog.push();var c=l.stitchChangeIncluded,d=o;l.stitchChangeIncluded=d,sceneryLog&&sceneryLog.ChangeInterval&&sceneryLog.ChangeInterval("included: "+c+" => "+d),l.stitchChangeFrame===s?(sceneryLog&&sceneryLog.ChangeInterval&&sceneryLog.ChangeInterval("stitchChangeFrame full change interval"),sceneryLog&&sceneryLog.ChangeInterval&&sceneryLog.push(),l.firstChangeInterval=l.lastChangeInterval=S.newForDisplay(null,null,this.display),sceneryLog&&sceneryLog.ChangeInterval&&sceneryLog.pop()):assert&&assert(c===d,"If we do not have stitchChangeFrame activated, our inclusion should not have changed");var g=l.firstChangeInterval,y=n&&null===n.drawableAfter,f=g&&null===g.drawableBefore;if(l.stitchChangeBefore===s&&!y&&!f){sceneryLog&&sceneryLog.ChangeInterval&&sceneryLog.ChangeInterval("bridge"),sceneryLog&&sceneryLog.ChangeInterval&&sceneryLog.push();var b=S.newForDisplay(r,null,this.display);n&&(n.nextChangeInterval=b),n=b,a=a||n,y=!0,sceneryLog&&sceneryLog.ChangeInterval&&sceneryLog.pop()}if((c||d)&&(y?g?null===g.drawableBefore?(n.drawableAfter=g.drawableAfter,n.nextChangeInterval=g.nextChangeInterval,n=l.lastChangeInterval===g?n:l.lastChangeInterval):(n.drawableAfter=l.firstDrawable,n.nextChangeInterval=g,n=l.lastChangeInterval):n.drawableAfter=l.firstDrawable:g&&(a=a||g,null===g.drawableBefore&&(assert&&assert(!n||r,"If we have a current change interval, we should be guaranteed a non-null lastUnchangedDrawable"),g.drawableBefore=r),n&&(n.nextChangeInterval=g),n=l.lastChangeInterval),r=n&&null===n.drawableAfter?null:l.lastDrawable?l.lastDrawable:r),h===this.children.length-1&&l.stitchChangeAfter===s&&(!n||null!==n.drawableAfter)){var u=S.newForDisplay(r,null,this.display);n&&(n.nextChangeInterval=u),n=u,a=a||n}l.cleanSyncTreeResults(),sceneryLog&&sceneryLog.ChangeInterval&&sceneryLog.pop()}if(assert&&assert(!!a==!!n,"Presence of first and current change intervals should be equal"),a||this.stitchChangeOnChildren!==this.display._frameId||0!==this.children.length||(a=n=S.newForDisplay(null,null,this.display)),this.firstChangeInterval=a,this.lastChangeInterval=n,this.firstDrawable=this.firstInnerDrawable=t,this.lastDrawable=this.lastInnerDrawable=i,assertSlow){for(var p=null,v=0;v<this.children.length;v++)if(this.children[v].shouldIncludeInParentDrawables()&&this.children[v].firstDrawable){p=this.children[v].firstDrawable;break}this.selfDrawable&&(p=this.selfDrawable);for(var C=this.selfDrawable,I=this.children.length-1;0<=I;I--)if(this.children[I].shouldIncludeInParentDrawables()&&this.children[I].lastDrawable){C=this.children[I].lastDrawable;break}assertSlow(p===this.firstDrawable),assertSlow(C===this.lastDrawable)}},updateSelfDrawable:function(){if(this.node.isPainted()){var e=this.selfRenderer;if(!this.selfDrawable||0==(this.selfDrawable.renderer&e&v.bitmaskRendererArea))return this.selfDrawable&&(sceneryLog&&sceneryLog.Instance&&sceneryLog.Instance("replacing old drawable "+this.selfDrawable.toString()+" with new renderer"),this.selfDrawable.markForDisposal(this.display)),this.selfDrawable=v.createSelfDrawable(this,this.node,e,this.fittability.ancestorsFittable),assert&&assert(this.selfDrawable),!0}else assert&&assert(null===this.selfDrawable,"Non-painted nodes should not have a selfDrawable");return!1},updateIncompatibleChildInstance:function(e,s){if(sceneryLog&&o.isLoggingPerformance()){var t=e.getDescendantCount()+1;100<t?sceneryLog.PerfCritical&&sceneryLog.PerfCritical("incompatible instance rebuild at "+this.trail.toPathString()+": "+t):40<t?sceneryLog.PerfMajor&&sceneryLog.PerfMajor("incompatible instance rebuild at "+this.trail.toPathString()+": "+t):0<t&&sceneryLog.PerfMinor&&sceneryLog.PerfMinor("incompatible instance rebuild at "+this.trail.toPathString()+": "+t)}this.display.markInstanceRootForDisposal(e);var i=g.createFromPool(this.display,this.trail.copy().addDescendant(e.node,s),!1,!1);return this.replaceInstanceWithIndex(e,i,s),i},groupSyncTree:function(e){var s=this.groupRenderer;assert&&assert((this.isBackbone?1:0)+(this.isInstanceCanvasCache?1:0)+(this.isSharedCanvasCacheSelf?1:0)==(s?1:0),"We should have precisely one of these flags set for us to have a groupRenderer");var t=!!s!=!!this.groupDrawable||!e&&this.groupChanged||this.groupDrawable&&this.groupDrawable.renderer!==s;t&&(this.groupDrawable&&(sceneryLog&&sceneryLog.Instance&&sceneryLog.Instance("replacing group drawable "+this.groupDrawable.toString()),this.groupDrawable.markForDisposal(this.display),this.groupDrawable=null),this.firstChangeInterval=this.lastChangeInterval=S.newForDisplay(null,null,this.display)),s&&(this.firstDrawable&&L.disconnectBefore(this.firstDrawable,this.display),this.lastDrawable&&L.disconnectAfter(this.lastDrawable,this.display),this.isBackbone?(t&&(this.groupDrawable=o.BackboneDrawable.createFromPool(this.display,this,this.getTransformRootInstance(),s,this.isDisplayRoot),this.isTransformed&&this.display.markTransformRootDirty(this,!0)),this.firstChangeInterval&&this.groupDrawable.stitch(this.firstDrawable,this.lastDrawable,this.firstChangeInterval,this.lastChangeInterval)):this.isInstanceCanvasCache?(t&&(this.groupDrawable=o.InlineCanvasCacheDrawable.createFromPool(s,this)),this.firstChangeInterval&&this.groupDrawable.stitch(this.firstDrawable,this.lastDrawable,this.firstChangeInterval,this.lastChangeInterval)):this.isSharedCanvasCacheSelf&&t&&(this.groupDrawable=o.CanvasBlock.createFromPool(s,this)),this.groupDrawable.setFittable(this.fittability.ancestorsFittable),this.firstDrawable=this.lastDrawable=this.groupDrawable),t?this.firstChangeInterval=this.lastChangeInterval=S.newForDisplay(null,null,this.display):s&&(this.firstChangeInterval=this.lastChangeInterval=null)},sharedSyncTree:function(){this.ensureSharedCacheInitialized();var e=this.sharedCacheRenderer;this.sharedCacheDrawable&&this.sharedCacheDrawable.renderer===e||(this.sharedCacheDrawable&&(sceneryLog&&sceneryLog.Instance&&sceneryLog.Instance("replacing shared cache drawable "+this.sharedCacheDrawable.toString()),this.sharedCacheDrawable.markForDisposal(this.display)),this.sharedCacheDrawable=new o.SharedCanvasCacheDrawable(this.trail,e,this,this.sharedCacheInstance),this.firstDrawable=this.sharedCacheDrawable,this.lastDrawable=this.sharedCacheDrawable,this.firstChangeInterval=this.lastChangeInterval=S.newForDisplay(null,null,this.display))},prepareChildInstances:function(e){for(;this.instanceRemovalCheckList.length;){var s=this.instanceRemovalCheckList.pop();-1===s.addRemoveCounter&&(s.addRemoveCounter=0,this.display.markInstanceRootForDisposal(s))}if(e)for(var t=0;t<this.node.children.length;t++){var i=this.node.children[t];this.appendInstance(g.createFromPool(this.display,this.trail.copy().addDescendant(i,t),!1,!1))}},ensureSharedCacheInitialized:function(){if(!this.sharedCacheInstance){var e=this.node.getId();this.sharedCacheInstance=this.display._sharedCanvasInstances[e],this.sharedCacheInstance||(this.sharedCacheInstance=g.createFromPool(this.display,new o.Trail(this.node),!1,!0),this.sharedCacheInstance.syncTree(),this.display._sharedCanvasInstances[e]=this.sharedCacheInstance,this.display.markTransformRootDirty(this.sharedCacheInstance,!0)),this.sharedCacheInstance.externalReferenceCount++,this.isTransformed&&this.display.markTransformRootDirty(this,!0)}},shouldIncludeInParentDrawables:function(){return this.node.isVisible()||!this.node.isExcludeInvisible()},findPreviousDrawable:function(e){for(var s=e-1;0<=s;s--){var t=this.children[s].lastDrawable;if(null!==t)return t}return null},findNextDrawable:function(e){for(var s=this.children.length,t=e+1;t<s;t++){var i=this.children[t].firstDrawable;if(null!==i)return i}return null},appendInstance:function(e){this.insertInstance(e,this.children.length)},insertInstance:function(e,s){assert&&assert(e instanceof g),assert&&assert(0<=s&&s<=this.children.length,"Instance insertion bounds check for index "+s+" with previous children length "+this.children.length),sceneryLog&&sceneryLog.InstanceTree&&sceneryLog.InstanceTree("inserting "+e.toString()+" into "+this.toString()),sceneryLog&&sceneryLog.InstanceTree&&sceneryLog.push(),e.stitchChangeFrame=this.display._frameId,this.stitchChangeOnChildren=this.display._frameId,this.children.splice(s,0,e),e.parent=this,s<=(e.oldParent=this).beforeStableIndex&&(this.beforeStableIndex=s-1),s>this.afterStableIndex?this.afterStableIndex=s+1:this.afterStableIndex++,this.fittability.onInsert(e.fittability),this.relativeTransform.addInstance(e),this.markChildVisibilityDirty(),sceneryLog&&sceneryLog.InstanceTree&&sceneryLog.pop()},removeInstance:function(e){return this.removeInstanceWithIndex(e,_.indexOf(this.children,e))},removeInstanceWithIndex:function(e,s){assert&&assert(e instanceof g),assert&&assert(0<=s&&s<this.children.length,"Instance removal bounds check for index "+s+" with previous children length "+this.children.length),sceneryLog&&sceneryLog.InstanceTree&&sceneryLog.InstanceTree("removing "+e.toString()+" from "+this.toString()),sceneryLog&&sceneryLog.InstanceTree&&sceneryLog.push();var t=this.display._frameId;e.stitchChangeFrame=t,this.stitchChangeOnChildren=t,0<=s-1&&(this.children[s-1].stitchChangeAfter=t),s+1<this.children.length&&(this.children[s+1].stitchChangeBefore=t),this.children.splice(s,1),e.parent=null,s<=(e.oldParent=this).beforeStableIndex&&(this.beforeStableIndex=s-1),s>=this.afterStableIndex?this.afterStableIndex=s:this.afterStableIndex--,this.fittability.onRemove(e.fittability),this.relativeTransform.removeInstance(e),sceneryLog&&sceneryLog.InstanceTree&&sceneryLog.pop()},replaceInstanceWithIndex:function(e,s,t){this.removeInstanceWithIndex(e,t),this.insertInstance(s,t)},reorderInstances:function(e,s){assert&&assert("number"==typeof e),assert&&assert("number"==typeof s),assert&&assert(e<=s),sceneryLog&&sceneryLog.InstanceTree&&sceneryLog.InstanceTree("Reordering "+this.toString()),sceneryLog&&sceneryLog.InstanceTree&&sceneryLog.push();var t=this.display._frameId;this.children.splice(e,s-e+1);for(var i=e;i<=s;i++){var a=this.findChildInstanceOnNode(this.node._children[i]);this.children.splice(i,0,a),a.stitchChangeFrame=t,e<i&&(a.stitchChangeAfter=t),i<s&&(a.stitchChangeBefore=t)}this.stitchChangeOnChildren=t,this.beforeStableIndex=Math.min(this.beforeStableIndex,e-1),this.afterStableIndex=Math.max(this.afterStableIndex,s+1),sceneryLog&&sceneryLog.InstanceTree&&sceneryLog.pop()},findChildInstanceOnNode:function(e){for(var s=e.getInstances(),t=0;t<s.length;t++)if(s[t].oldParent===this)return s[t];return null},onChildInserted:function(e,s){sceneryLog&&sceneryLog.Instance&&sceneryLog.Instance("inserting child node "+e.constructor.name+"#"+e.id+" into "+this.toString()),sceneryLog&&sceneryLog.Instance&&sceneryLog.push(),assert&&assert(!this.stateless,"If we are stateless, we should not receive these notifications");var t=this.findChildInstanceOnNode(e);t?(sceneryLog&&sceneryLog.Instance&&sceneryLog.Instance("instance already exists"),t.addRemoveCounter+=1,assert&&assert(0===t.addRemoveCounter)):(sceneryLog&&sceneryLog.Instance&&sceneryLog.Instance("creating stub instance"),sceneryLog&&sceneryLog.Instance&&sceneryLog.push(),t=g.createFromPool(this.display,this.trail.copy().addDescendant(e,s),!1,!1),sceneryLog&&sceneryLog.Instance&&sceneryLog.pop()),this.insertInstance(t,s),this.markSkipPruning(),sceneryLog&&sceneryLog.Instance&&sceneryLog.pop()},onChildRemoved:function(e,s){sceneryLog&&sceneryLog.Instance&&sceneryLog.Instance("removing child node "+e.constructor.name+"#"+e.id+" from "+this.toString()),sceneryLog&&sceneryLog.Instance&&sceneryLog.push(),assert&&assert(!this.stateless,"If we are stateless, we should not receive these notifications"),assert&&assert(this.children[s].node===e,"Ensure that our instance matches up");var t=this.findChildInstanceOnNode(e);assert&&assert(null!==t,"We should always have a reference to a removed instance"),t.addRemoveCounter-=1,assert&&assert(-1===t.addRemoveCounter),this.instanceRemovalCheckList.push(t),this.removeInstanceWithIndex(t,s),this.markSkipPruning(),sceneryLog&&sceneryLog.Instance&&sceneryLog.pop()},onChildrenReordered:function(e,s){sceneryLog&&sceneryLog.Instance&&sceneryLog.Instance("reordering children for "+this.toString()),sceneryLog&&sceneryLog.Instance&&sceneryLog.push(),this.reorderInstances(e,s),this.markSkipPruning(),sceneryLog&&sceneryLog.Instance&&sceneryLog.pop()},onVisibilityChange:function(){assert&&assert(!this.stateless,"If we are stateless, we should not receive these notifications"),this.stitchChangeFrame=this.display._frameId,this.parent&&this.parent.markSkipPruning(),this.visibilityDirty=!0,this.parent&&this.parent.markChildVisibilityDirty()},onOpacityChange:function(){assert&&assert(!this.stateless,"If we are stateless, we should not receive these notifications"),this.markRenderStateDirty()},markChildVisibilityDirty:function(){this.childVisibilityDirty||(this.childVisibilityDirty=!0,this.parent&&this.parent.markChildVisibilityDirty())},updateDrawableFittability:function(e){this.selfDrawable&&this.selfDrawable.setFittable(e),this.groupDrawable&&this.groupDrawable.setFittable(e)},updateVisibility:function(e,s,t){this.visibilityDirty&&(t=!0);var i=this.node.isVisible(),a=this.visible,n=this.relativeVisible,r=this.selfVisible;this.visible=e&&i,this.relativeVisible=s&&i,this.selfVisible=!!this.isVisibilityApplied||this.relativeVisible;for(var h=this.children.length,l=0;l<h;l++){var o=this.children[l];(t||o.visibilityDirty||o.childVisibilityDirty)&&o.updateVisibility(this.visible,!!this.isVisibilityApplied||this.relativeVisible,t)}this.visibilityDirty=!1,this.childVisibilityDirty=!1,this.visible!==a&&this.trigger0("visibility"),this.relativeVisible!==n&&this.trigger0("relativeVisibility"),this.selfVisible!==r&&this.trigger0("selfVisibility")},getDescendantCount:function(){for(var e=this.children.length,s=0;s<this.children.length;s++)e+=this.children[s].getDescendantCount();return e},addSVGGroup:function(e){this.svgGroups.push(e)},removeSVGGroup:function(e){var s=_.indexOf(this.svgGroups,e);assert&&assert(0<=s,"Tried to remove an SVGGroup from an Instance when it did not exist"),this.svgGroups.splice(s,1)},lookupSVGGroup:function(e){for(var s=this.svgGroups.length,t=0;t<s;t++){var i=this.svgGroups[t];if(i.block===e)return i}return null},getFilterRootInstance:function(){return this.isBackbone||this.isInstanceCanvasCache||!this.parent?this:this.parent.getFilterRootInstance()},getTransformRootInstance:function(){return this.isTransformed||!this.parent?this:this.parent.getTransformRootInstance()},getVisibilityRootInstance:function(){return this.isVisibilityApplied||!this.parent?this:this.parent.getVisibilityRootInstance()},attachNodeListeners:function(){this.relativeTransform.attachNodeListeners(),this.isSharedCanvasCachePlaceholder||(this.node.onStatic("childInserted",this.childInsertedListener),this.node.onStatic("childRemoved",this.childRemovedListener),this.node.onStatic("childrenReordered",this.childrenReorderedListener),this.node.onStatic("visibility",this.visibilityListener),this.node.onStatic("opacity",this.markRenderStateDirtyListener),this.node.onStatic("hint",this.markRenderStateDirtyListener),this.node.onStatic("clip",this.markRenderStateDirtyListener),this.node.onStatic("rendererBitmask",this.markRenderStateDirtyListener),this.node.onStatic("rendererSummary",this.markRenderStateDirtyListener))},detachNodeListeners:function(){this.relativeTransform.detachNodeListeners(),this.isSharedCanvasCachePlaceholder||(this.node.offStatic("childInserted",this.childInsertedListener),this.node.offStatic("childRemoved",this.childRemovedListener),this.node.offStatic("childrenReordered",this.childrenReorderedListener),this.node.offStatic("visibility",this.visibilityListener),this.node.offStatic("opacity",this.markRenderStateDirtyListener),this.node.offStatic("hint",this.markRenderStateDirtyListener),this.node.offStatic("clip",this.markRenderStateDirtyListener),this.node.offStatic("rendererBitmask",this.markRenderStateDirtyListener),this.node.offStatic("rendererSummary",this.markRenderStateDirtyListener))},markRenderStateDirty:function(){this.renderStateDirtyFrame=this.display._frameId,this.parent&&this.parent.markSkipPruning()},markSkipPruning:function(){this.skipPruningFrame=this.display._frameId,this.parent&&this.parent.markSkipPruning()},getBranchIndexTo:function(e){var s=this.branchIndexMap[e.id];if(void 0!==s)return s;var t=this.trail.getBranchIndexTo(e.trail);return this.branchIndexMap[e.id]=t,e.branchIndexMap[this.id]=t,this.branchIndexReferences.push(e),e.branchIndexReferences.push(this),t},dispose:function(){for(sceneryLog&&sceneryLog.Instance&&sceneryLog.Instance("dispose "+this.toString()),sceneryLog&&sceneryLog.Instance&&sceneryLog.push(),assert&&assert(this.active,"Seems like we tried to dispose this Instance twice, it is not active"),this.active=!1;this.branchIndexReferences.length;){var e=this.branchIndexReferences.pop();delete this.branchIndexMap[e.id],delete e.branchIndexMap[this.id],a(e.branchIndexReferences,this)}this.groupDrawable&&this.groupDrawable.disposeImmediately(this.display),this.sharedCacheDrawable&&this.sharedCacheDrawable.disposeImmediately(this.display),this.selfDrawable&&this.selfDrawable.disposeImmediately(this.display);for(var s=this.children.length,t=0;t<s;t++)this.children[t].dispose();for(;this.instanceRemovalCheckList.length;){var i=this.instanceRemovalCheckList.pop();i.active&&i.dispose()}this.stateless||this.detachNodeListeners(),this.node.removeInstance(this),this.sharedCacheInstance&&(this.sharedCacheInstance.externalReferenceCount--,0===this.sharedCacheInstance.externalReferenceCount&&(delete this.display._sharedCanvasInstances[this.node.getId()],this.sharedCacheInstance.dispose())),this.cleanInstance(null,null),this.removeAllEventListeners(),this.freeToPool(),sceneryLog&&sceneryLog.Instance&&sceneryLog.pop()},audit:function(e,s){if(assertSlow){void 0===e&&(e=this.display._frameId),assertSlow(!this.stateless,"State is required for all display instances"),assertSlow(null===this.firstDrawable==(null===this.lastDrawable),"First/last drawables need to both be null or non-null"),assertSlow(!this.isBackbone&&!this.isSharedCanvasCachePlaceholder||this.groupDrawable,"If we are a backbone or shared cache, we need to have a groupDrawable reference"),assertSlow(!this.isSharedCanvasCachePlaceholder||!this.node.isPainted()||this.selfDrawable,"We need to have a selfDrawable if we are painted and not a shared cache"),assertSlow(!this.isTransformed&&!this.isCanvasCache||this.groupDrawable,"We need to have a groupDrawable if we are a backbone or any type of canvas cache"),assertSlow(!this.isSharedCanvasCachePlaceholder||this.sharedCacheDrawable,"We need to have a sharedCacheDrawable if we are a shared cache"),assertSlow(0===this.addRemoveCounter,"Our addRemoveCounter should always be 0 at the end of syncTree");for(var t=0;t<this.children.length;t++){this.children[t].audit(e,s)}this.relativeTransform.audit(e,s),this.fittability.audit()}},auditVisibility:function(e){if(assertSlow){var s=e&&this.node.isVisible(),t=this.trail.isVisible();assertSlow(s===t,"Trail visibility failure"),assertSlow(s===this.visible,"Visible flag failure");for(var i=0;i<this.children.length;i++){this.children[i].auditVisibility(s)}}},auditChangeIntervals:function(e,s,t,i){if(e)for(var a=e;a!==s;)a=a.oldNextDrawable;if(t)for(var n=t;n!==i;)n=n.nextDrawable;function r(e,s){if(assertSlow)for(assertSlow(null!==e),assertSlow(null!==s);e!==s;)assertSlow(e.nextDrawable===e.oldNextDrawable,"Change interval mismatch"),e=e.nextDrawable}if(assertSlow){var h=this.firstChangeInterval,l=this.lastChangeInterval;if(h&&null===h.drawableBefore||assertSlow(e===t,"If we have no changes, or our first change interval is not open, our firsts should be the same"),l&&null===l.drawableAfter||assertSlow(s===i,"If we have no changes, or our last change interval is not open, our lasts should be the same"),h){assertSlow(l,"We should not be missing only one change interval"),null!==h.drawableBefore&&r(e,h.drawableBefore),null!==l.drawableAfter&&r(l.drawableAfter,s);for(var o=h;o&&o.nextChangeInterval;){var c=o.nextChangeInterval;assertSlow(null!==o.drawableAfter),assertSlow(null!==c.drawableBefore),r(o.drawableAfter,c.drawableBefore),o=c}}else assertSlow(!l,"We should not be missing only one change interval"),e&&r(e,s)}},toString:function(){return this.id+"#"+(this.node?(this.node.constructor.name?this.node.constructor.name:"?")+"#"+this.node.id:"-")}}),t.mixInto(g,{initialize:g.prototype.initialize}),g});