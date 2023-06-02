export const header = `<roblox xmlns:xmime="http://www.w3.org/2005/05/xmlmime" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="http://www.roblox.com/roblox.xsd" version="4">
	<Meta name="ExplicitAutoJoints">true</Meta>
	<External>null</External>
	<External>nil</External>
	<Item class="Part">
		<Properties>
			<bool name="Anchored">true</bool>
			<BinaryString name="AttributesSerialize"></BinaryString>
			<float name="BackParamA">-0.5</float>
			<float name="BackParamB">0.5</float>
			<token name="BackSurface">0</token>
			<token name="BackSurfaceInput">0</token>
			<float name="BottomParamA">-0.5</float>
			<float name="BottomParamB">0.5</float>
			<token name="BottomSurface">0</token>
			<token name="BottomSurfaceInput">0</token>
			<CoordinateFrame name="CFrame">
				<X>0</X>
				<Y>0</Y>
				<Z>0</Z>
				<R00>1</R00>
				<R01>0</R01>
				<R02>0</R02>
				<R10>0</R10>
				<R11>1</R11>
				<R12>0</R12>
				<R20>0</R20>
				<R21>0</R21>
				<R22>1</R22>
			</CoordinateFrame>
			<bool name="CanCollide">true</bool>
			<bool name="CanQuery">true</bool>
			<bool name="CanTouch">true</bool>
			<bool name="CastShadow">true</bool>
			<string name="CollisionGroup">Default</string>
			<int name="CollisionGroupId">0</int>
			<Color3uint8 name="Color3uint8">4294967295</Color3uint8>
			<PhysicalProperties name="CustomPhysicalProperties">
				<CustomPhysics>false</CustomPhysics>
			</PhysicalProperties>
			<float name="FrontParamA">-0.5</float>
			<float name="FrontParamB">0.5</float>
			<token name="FrontSurface">0</token>
			<token name="FrontSurfaceInput">0</token>
			<float name="LeftParamA">-0.5</float>
			<float name="LeftParamB">0.5</float>
			<token name="LeftSurface">0</token>
			<token name="LeftSurfaceInput">0</token>
			<bool name="Locked">false</bool>
			<bool name="Massless">false</bool>
			<token name="Material">256</token>
			<string name="MaterialVariantSerialized"></string>
			<string name="Name">BypassedImage</string>
			<CoordinateFrame name="PivotOffset">
				<X>0</X>
				<Y>0</Y>
				<Z>0</Z>
				<R00>1</R00>
				<R01>0</R01>
				<R02>0</R02>
				<R10>0</R10>
				<R11>1</R11>
				<R12>0</R12>
				<R20>0</R20>
				<R21>0</R21>
				<R22>1</R22>
			</CoordinateFrame>
			<float name="Reflectance">0</float>
			<float name="RightParamA">-0.5</float>
			<float name="RightParamB">0.5</float>
			<token name="RightSurface">0</token>
			<token name="RightSurfaceInput">0</token>
			<int name="RootPriority">0</int>
			<Vector3 name="RotVelocity">
				<X>0</X>
				<Y>0</Y>
				<Z>0</Z>
			</Vector3>
			<int64 name="SourceAssetId">-1</int64>
			<BinaryString name="Tags"></BinaryString>
			<float name="TopParamA">-0.5</float>
			<float name="TopParamB">0.5</float>
			<token name="TopSurface">0</token>
			<token name="TopSurfaceInput">0</token>
			<float name="Transparency">0</float>
			<Vector3 name="Velocity">
				<X>0</X>
				<Y>0</Y>
				<Z>0</Z>
			</Vector3>
			<token name="formFactorRaw">1</token>
			<token name="shape">1</token>
			<Vector3 name="size">
				<X>16</X>
				<Y>16</Y>
				<Z>1</Z>
			</Vector3>
		</Properties>
		<Item class="SurfaceGui">
			<Properties>
				<bool name="Active">true</bool>
				<Ref name="Adornee">null</Ref>
				<bool name="AlwaysOnTop">false</bool>
				<BinaryString name="AttributesSerialize"></BinaryString>
				<bool name="AutoLocalize">true</bool>
				<float name="Brightness">1</float>
				<Vector2 name="CanvasSize">
					<X>800</X>
					<Y>600</Y>
				</Vector2>
				<bool name="ClipsDescendants">true</bool>
				<bool name="Enabled">true</bool>
				<token name="Face">5</token>
				<float name="LightInfluence">1</float>
				<string name="Name">SurfaceGui</string>
				<float name="PixelsPerStud">50</float>
				<bool name="ResetOnSpawn">true</bool>
				<Ref name="RootLocalizationTable">null</Ref>
				<token name="SelectionBehaviorDown">0</token>
				<token name="SelectionBehaviorLeft">0</token>
				<token name="SelectionBehaviorRight">0</token>
				<token name="SelectionBehaviorUp">0</token>
				<bool name="SelectionGroup">false</bool>
				<token name="SizingMode">1</token>
				<int64 name="SourceAssetId">-1</int64>
				<BinaryString name="Tags"></BinaryString>
				<float name="ToolPunchThroughDistance">0</float>
				<token name="ZIndexBehavior">1</token>
				<float name="ZOffset">0</float>
			</Properties>
`
export const footer = `
</Item>
	</Item>
</roblox>
`

export const generateFrame = (x, y, width, height, imagewidth, imageheight, imageoffset, r, g, b, a) => {
	return `<Item class="Frame">
	<Properties>
		<bool name="Active">true</bool>
		<Vector2 name="AnchorPoint">
			<X>0</X>
			<Y>0</Y>
		</Vector2>
		<BinaryString name="AttributesSerialize"></BinaryString>
		<bool name="AutoLocalize">true</bool>
		<token name="AutomaticSize">0</token>
		<Color3 name="BackgroundColor3">
			<R>${r / 255}</R>
			<G>${g / 255}</G>
			<B>${b / 255}</B>
		</Color3>
		<float name="BackgroundTransparency">${(255 - a) / 255}</float>
		<Color3 name="BorderColor3">
			<R>0.105882362</R>
			<G>0.164705887</G>
			<B>0.207843155</B>
		</Color3>
		<token name="BorderMode">0</token>
		<int name="BorderSizePixel">0</int>
		<bool name="ClipsDescendants">false</bool>
		<bool name="Draggable">false</bool>
		<int name="LayoutOrder">0</int>
		<string name="Name">Frame</string>
		<Ref name="NextSelectionDown">null</Ref>
		<Ref name="NextSelectionLeft">null</Ref>
		<Ref name="NextSelectionRight">null</Ref>
		<Ref name="NextSelectionUp">null</Ref>
		<UDim2 name="Position">
			<XS>${x / imagewidth}</XS>
			<XO>0</XO>
			<YS>${y / imageheight}</YS>
			<YO>0</YO>
		</UDim2>
		<Ref name="RootLocalizationTable">null</Ref>
		<float name="Rotation">0</float>
		<bool name="Selectable">false</bool>
		<token name="SelectionBehaviorDown">0</token>
		<token name="SelectionBehaviorLeft">0</token>
		<token name="SelectionBehaviorRight">0</token>
		<token name="SelectionBehaviorUp">0</token>
		<bool name="SelectionGroup">false</bool>
		<Ref name="SelectionImageObject">null</Ref>
		<int name="SelectionOrder">0</int>
		<UDim2 name="Size">
			<XS>${(width / imagewidth) + imageoffset}</XS>
			<XO>0</XO>
			<YS>${(height / imageheight) + imageoffset}</YS>
			<YO>0</YO>
		</UDim2>
		<token name="SizeConstraint">0</token>
		<int64 name="SourceAssetId">-1</int64>
		<token name="Style">0</token>
		<BinaryString name="Tags"></BinaryString>
		<bool name="Visible">true</bool>
		<int name="ZIndex">1</int>
	</Properties>
</Item>
`
}