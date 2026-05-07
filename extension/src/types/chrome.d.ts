declare global {
  namespace chrome {
    namespace runtime {
      function sendMessage(message: any): Promise<any>;
      function getURL(path: string): string;
      const onMessage: {
        addListener(callback: (message: any, sender: any, sendResponse: (response?: any) => void) => boolean | void): void;
      };
      const onConnect: {
        addListener(callback: (port: any) => void): void;
      };
    }
    
    namespace storage {
      namespace local {
        function get(keys?: string | string[] | Record<string, any> | null): Promise<Record<string, any>>;
        function set(items: Record<string, any>): Promise<void>;
        function clear(): Promise<void>;
      }
    }
    
    namespace scripting {
      function executeScript(injection: any): Promise<any[]>;
    }
  }
}

export {};
