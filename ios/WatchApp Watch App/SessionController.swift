import Foundation
import WatchKit

final class SessionController: NSObject, WKExtendedRuntimeSessionDelegate, ObservableObject {
  var session: WKExtendedRuntimeSession
  
  override init() {
    session = WKExtendedRuntimeSession()
    super.init()
    session.delegate = self
  }
  
  func startNew() {
    session = WKExtendedRuntimeSession()
    session.delegate = self
    session.start()
  }
  
  func extendedRuntimeSessionDidStart(_ extendedRuntimeSession: WKExtendedRuntimeSession) {
      print("extended session did start")
  }


  func extendedRuntimeSessionWillExpire(_ extendedRuntimeSession: WKExtendedRuntimeSession) {
    print("extended session will expire")
  }
      
  func extendedRuntimeSession(_ extendedRuntimeSession: WKExtendedRuntimeSession, didInvalidateWith reason: WKExtendedRuntimeSessionInvalidationReason, error: Error?) {
      print("extended session end")
  }
}
