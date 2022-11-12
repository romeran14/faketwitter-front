import { Alert } from "@chakra-ui/react";
import { ScaleFade } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";

export default function AlertMessage({
  message,
  status = "info",
  colorScheme = "twitter",
}) {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <ScaleFade initialScale={0.9} in={onToggle}>
      <Alert variant="left-accent" colorScheme={colorScheme} status={status}>
      
        {message}
      </Alert>
    </ScaleFade>
  );
}
