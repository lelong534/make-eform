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

function createInputBand(item) {
    let inputBandData = ''
    item.inputs.forEach(input => {
        if (input.type == 'input') {
            if (input != item.inputs.at(-1)) {
                inputBandData += `"`+ input.title + `" + ($F{` + input.id + `} == null ? "" : TRIM($F{`+ input.id +`})) + `
            } else {
                inputBandData += `"`+ input.title + `" + ($F{` + input.id + `} == null ? "" : TRIM($F{`+ input.id +`})) `
            }
        } else if (input.type == 'text') {
            if (input != item.input.at(-1)) {
                inputBandData += `"`+ input.title + `" + `
            } else {
                inputBandData += `"`+ input.title + `" + `
            }
        }
    })

    return `<band height="20">
        <textField isStretchWithOverflow="true">
            <reportElement stretchType="RelativeToTallestObject" x="60" y="0" width="470" height="20">
                <property name="com.jaspersoft.studio.unit.height" value="pixel"/>
            </reportElement>
            <textElement textAlignment="Left" verticalAlignment="Top" markup="html">
                <font fontName="Times New Roman" size="12" isBold="false"/>
                <paragraph lineSpacing="Double" spacingBefore="5"/>
            </textElement>
            <textFieldExpression><![CDATA[`+ inputBandData +`]]></textFieldExpression>
        </textField>
    </band>`
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

            items.forEach(item => {
                if (item.type == 'input') {
                    fields += createField(item)
                    bands += createInputBand(item)
                } else if (item.type == 'text') {
                    bands += createTextBand(item)
                }
            });
            
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
