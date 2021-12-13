function createField(item) {
    let fields = ''
    item.inputs.forEach(input => {
        if (input.type == 'input') {
            fields += `<field name="` + input.id  + `" class="java.lang.String">
                    <fieldDescription><![CDATA[` + input.id + `]]></fieldDescription>
                </field>`
        }
        return fields
    })
    return fields
}

function createTableField(item) {
    let autoIncrement = true
    let startField = ''
    let endField = ''
    let bodyField = ''

    if (autoIncrement) {
        startField = `
            <subDataset name="data`+ item.id +`">
                <property name="com.jaspersoft.studio.data.defaultdataadapter"/>
                <queryString language="json">
                    <![CDATA[`+ item.id +`]]>
                </queryString>
                <field name="stt" class="java.lang.String">
                    <fieldDescription><![CDATA[stt]]></fieldDescription>
                </field>`

        endField = `
                <group name="stt">
                    <groupExpression><![CDATA[$F{stt}]]></groupExpression>
                </group>
            </subDataset>`
    }

    item.column.forEach(col => {
        bodyField += `
            <field name="`+col.id+`" class="java.lang.String">
                <fieldDescription><![CDATA[`+col.id+`]]></fieldDescription>
            </field>`
    })

    return startField + bodyField + endField
}

function createTableBand(item) {
    let autoIncrement = true
    let startBands = ''
    let endBands = ''
    let bodyBands = ''
    let tableColumnNumber = item.column.length

    if (autoIncrement) {
        startBands = `
            <band height="60">
                <property name="com.jaspersoft.studio.unit.height" value="pixel"/>
                <componentElement>
                    <reportElement x="60" y="0" width="470" height="60">
                        <property name="com.jaspersoft.studio.layout" value="com.jaspersoft.studio.editor.layout.VerticalRowLayout"/>
                        <property name="com.jaspersoft.studio.table.style.column_header" value="Table_CH"/>
                        <property name="com.jaspersoft.studio.table.style.detail" value="Table_TD"/>
                    </reportElement>
                    <jr:table xmlns:jr="http://jasperreports.sourceforge.net/jasperreports/components" xsi:schemaLocation="http://jasperreports.sourceforge.net/jasperreports/components http://jasperreports.sourceforge.net/xsd/components.xsd">
                        <datasetRun subDataset="data`+item.id+`">
                            <dataSourceExpression><![CDATA[((net.sf.jasperreports.engine.data.JsonDataSource)$P{REPORT_DATA_SOURCE}).subDataSource("`+item.id+`")]]></dataSourceExpression>
                        </datasetRun>
                        <jr:column width="40">
                            <jr:columnHeader style="Table_CH" height="30">
                            <staticText>
                                <reportElement x="0" y="0" width="40" height="30"/>
                                <textElement textAlignment="Center" verticalAlignment="Middle">
                                <font fontName="Times New Roman" size="12" isBold="true"/>
                                </textElement>
                                <text><![CDATA[TT]]></text>
                            </staticText>
                            </jr:columnHeader>
                            <jr:detailCell style="Table_TD" height="30">
                            <textField>
                                <reportElement stretchType="RelativeToTallestObject" x="0" y="0" width="40" height="30"/>
                                <textElement textAlignment="Center" verticalAlignment="Middle">
                                <font fontName="Times New Roman" size="12"/>
                                </textElement>
                                <textFieldExpression><![CDATA[$V{stt_COUNT}]]></textFieldExpression>
                            </textField>
                            </jr:detailCell>
                        </jr:column>`

        endBands = ` </jr:table>
                </componentElement>
            </band>`
        
        item.column.forEach(col => {
            bodyBands += `
                <jr:column width="`+430/tableColumnNumber+`">
                    <jr:columnHeader style="Table_CH" height="30">
                        <staticText>
                            <reportElement x="0" y="0" width="`+430/tableColumnNumber+`" height="30"/>
                            <textElement textAlignment="Center" verticalAlignment="Middle">
                                <font fontName="Times New Roman" size="12" isBold="true"/>
                            </textElement>
                            <text><![CDATA[`+col.name+`]]></text>
                        </staticText>
                    </jr:columnHeader>
                    <jr:detailCell style="Table_TD" height="30">
                        <textField>
                            <reportElement x="0" y="0" width="`+430/tableColumnNumber+`" height="30"/>
                            <textElement textAlignment="Center" verticalAlignment="Middle">
                                <font fontName="Times New Roman" size="12"/>
                            </textElement>
                            <textFieldExpression><![CDATA[$F{`+col.id+`} == null ? "" : TRIM($F{`+col.id+`})]]></textFieldExpression>
                        </textField>
                    </jr:detailCell>
                </jr:column>`
        })
    
        return startBands + bodyBands + endBands
    }
}

function createInputBand(item) {
    let inputBandData = ''
    // item.inputs.forEach(input => {
    //     if (input.type == 'input') {
    //         if (input != item.inputs.at(-1)) {
    //             inputBandData += `" `+ input.title + ` " + ($F{` + input.id + `} == null ? " " : TRIM($F{`+ input.id +`})) + `
    //         } else {
    //             inputBandData += `" `+ input.title + ` " + ($F{` + input.id + `} == null ? "" : TRIM($F{`+ input.id +`})) `
    //         }
    //     } else if (input.type == 'text') {
    //         if (input != item.inputs.at(-1)) {
    //             inputBandData += `" `+ input.title + ` " + `
    //         } else {
    //             inputBandData += `" `+ input.title + ` " `
    //         }
    //     }
    // })

    let currentWidth = 0
    item.inputs.forEach(input => {
        if (input.type == 'input') {
            currentWidth += 39*(input.labelWidth + input.inputWidth)
            inputBandData += `<textField isStretchWithOverflow="true">
                    <reportElement stretchType="RelativeToTallestObject" x="60`+currentWidth+`" y="0" width="`+ 39*(input.labelWidth + input.inputWidth) +`" height="20">
                        <property name="com.jaspersoft.studio.unit.height" value="pixel"/>
                    </reportElement>
                    <textElement textAlignment="Left" verticalAlignment="Top" markup="html">
                        <font fontName="Times New Roman" size="12" isBold="false"/>
                        <paragraph lineSpacing="Double" spacingBefore="5"/>
                    </textElement>
                    <textFieldExpression><![CDATA["`+ input.title + ` " + ($F{` + input.id + `} == null ? " " : TRIM($F{`+ input.id +`}))]]></textFieldExpression>
                </textField>`
        } else if (item.type == 'text') {
            currentWidth += 39*input.labelWidth
            inputBandData += `<textField isStretchWithOverflow="true">
                    <reportElement stretchType="RelativeToTallestObject" x="60`+currentWidth+`" y="0" width="`+ 39*input.labelWidth +`" height="20">
                        <property name="com.jaspersoft.studio.unit.height" value="pixel"/>
                    </reportElement>
                    <textElement textAlignment="Left" verticalAlignment="Top" markup="html">
                        <font fontName="Times New Roman" size="12" isBold="false"/>
                        <paragraph lineSpacing="Double" spacingBefore="5"/>
                    </textElement>
                    <textFieldExpression><![CDATA["`+ input.title + ` "]]></textFieldExpression>
                </textField>`
        }
    }) 
    return `<band height="20">
    ` +inputBandData+ `</band>`
}

function createTextBand(item) {
    let align = ''
    if (item.align == 'left') {
        align = `<textElement textAlignment="Left" verticalAlignment="Top" markup="none">`
    } else if (item.align == 'center') {
        align = `<textElement textAlignment="Center" verticalAlignment="Top" markup="none">`
    } else if (item.align == 'end') {
        align = `<textElement textAlignment="Right" verticalAlignment="Top" markup="none">`
    }

    let isBold = `false`
    if (item.weight == 'bold') isBold = `true`

    let isItalic = `false`
    if (item.style == 'italic') isItalic = `true`

    let size = `12`
    if (item.size == 'h3') {
        size = `14`
        isBold = true
    }

    return `<band height="20">
        <textField isStretchWithOverflow="true">
            <reportElement stretchType="RelativeToTallestObject" x="60" y="0" width="470" height="20">
                <property name="com.jaspersoft.studio.unit.height" value="pixel"/>
            </reportElement>
            `+ align +`
                <font fontName="Times New Roman" size="`+ size +`" isBold="`+ isBold + `" isItalic="` + isItalic +`"/>
                <paragraph lineSpacing="Double" spacingBefore="5"/>
            </textElement>
            <textFieldExpression><![CDATA["` + item.title +`"]]></textFieldExpression>
        </textField>
    </band>`
}

export const jrxml = {
    methods: {
        createJrxml(items) {
            let fields = ''
            let bands = ''
            let hasTable = false

            items.forEach(item => {
                if (item.type == 'input') {
                    fields += createField(item)
                    bands += createInputBand(item)
                } else if (item.type == 'text') {
                    bands += createTextBand(item)
                } else if (item.type == 'table') {
                    hasTable = true
                    fields += createTableField(item)    
                    bands += createTableBand(item)
                }
            });

            if (hasTable) {
                return startContent + tableStyle + fields + midContent + bands + endContent
            }
            
            return startContent + fields + midContent + bands + endContent
        }
    }
}

const startContent = `<?xml version="1.0" encoding="UTF-8"?>
    <jasperReport xmlns="http://jasperreports.sourceforge.net/jasperreports" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://jasperreports.sourceforge.net/jasperreports http://jasperreports.sourceforge.net/xsd/jasperreport.xsd" name="eform" pageWidth="595" pageHeight="842" columnWidth="555" leftMargin="20" rightMargin="20" topMargin="20" bottomMargin="20" whenResourceMissingType="Error">
        <property name="com.jaspersoft.studio.data.defaultdataadapter"/>`

const midContent =  `
    <background>
        <band splitType="Stretch"/>
        </background>
    <detail>`

const endContent = `
	</detail>
    </jasperReport>`

const tableStyle = `
    <style name="Table_CH" mode="Opaque" backcolor="#FFFFFF">
        <box>
            <pen lineWidth="0.5" lineColor="#000000"/>
            <topPen lineWidth="0.5" lineColor="#000000"/>
            <leftPen lineWidth="0.5" lineColor="#000000"/>
            <bottomPen lineWidth="0.5" lineColor="#000000"/>
            <rightPen lineWidth="0.5" lineColor="#000000"/>
        </box>
    </style>
    <style name="Table_TD" mode="Opaque" backcolor="#FFFFFF">
        <box>
            <pen lineWidth="0.5" lineColor="#000000"/>
            <topPen lineWidth="0.5" lineColor="#000000"/>
            <leftPen lineWidth="0.5" lineColor="#000000"/>
            <bottomPen lineWidth="0.5" lineColor="#000000"/>
            <rightPen lineWidth="0.5" lineColor="#000000"/>
        </box>
    </style>`