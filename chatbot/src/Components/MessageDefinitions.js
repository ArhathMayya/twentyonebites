import TextComponent from "./messageComponents/TextComponent"; // Use import instead of require

export default function MessageDefinition(messageData) {
    console.log("MessageDef: ",messageData)
    
    switch (messageData.type) {
        case 'text':
            return TextComponent(messageData) // Render TextComponent as JSX
        default:
            return <div>Unsupported message type</div>; // Handle unsupported message types
    }
}


