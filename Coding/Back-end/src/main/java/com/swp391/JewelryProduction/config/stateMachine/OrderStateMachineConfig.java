package com.swp391.JewelryProduction.config.stateMachine;


import com.swp391.JewelryProduction.enums.OrderEvent;
import com.swp391.JewelryProduction.enums.OrderStatus;
import com.swp391.JewelryProduction.pojos.Order;
import com.swp391.JewelryProduction.services.order.OrderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.statemachine.action.Action;
import org.springframework.statemachine.config.EnableStateMachineFactory;
import org.springframework.statemachine.config.EnumStateMachineConfigurerAdapter;
import org.springframework.statemachine.config.StateMachineFactory;
import org.springframework.statemachine.config.builders.StateMachineConfigurationConfigurer;
import org.springframework.statemachine.config.builders.StateMachineStateConfigurer;
import org.springframework.statemachine.config.builders.StateMachineTransitionConfigurer;
import org.springframework.statemachine.config.configurers.StateConfigurer;
import org.springframework.statemachine.data.RepositoryState;
import org.springframework.statemachine.data.RepositoryTransition;
import org.springframework.statemachine.data.StateRepository;
import org.springframework.statemachine.data.TransitionRepository;
import org.springframework.statemachine.data.jpa.JpaPersistingStateMachineInterceptor;
import org.springframework.statemachine.data.jpa.JpaStateMachineRepository;
import org.springframework.statemachine.data.support.StateMachineJackson2RepositoryPopulatorFactoryBean;
import org.springframework.statemachine.guard.Guard;
import org.springframework.statemachine.persist.StateMachineRuntimePersister;
import org.springframework.statemachine.service.DefaultStateMachineService;
import org.springframework.statemachine.service.StateMachineService;

@Configuration
public class OrderStateMachineConfig {

    @Bean
    public StateMachineRuntimePersister<OrderStatus, OrderEvent, String> stateMachineRuntimePersister(
            JpaStateMachineRepository jpaStateMachineRepository) {
        return new JpaPersistingStateMachineInterceptor<>(jpaStateMachineRepository);
    }

    @Bean
    public StateMachineService<OrderStatus, OrderEvent> stateMachineService(
            StateMachineFactory<OrderStatus, OrderEvent> stateMachineFactory,
            StateMachineRuntimePersister<OrderStatus, OrderEvent, String> stateMachineRuntimePersister) {
        return new DefaultStateMachineService<OrderStatus, OrderEvent>(stateMachineFactory, stateMachineRuntimePersister);
    }

    @Bean
    public StateMachineJackson2RepositoryPopulatorFactoryBean jackson2RepositoryPopulatorFactoryBean() {
        StateMachineJackson2RepositoryPopulatorFactoryBean factoryBean = new StateMachineJackson2RepositoryPopulatorFactoryBean();
        factoryBean.setResources(new Resource[]{new ClassPathResource("data.json")});
        return factoryBean;
    }


    /*---------------------------------------------------------------------------------*/
    /*--------------------DEPENDENCY INJECT NECESSARY SERVICE LAYER--------------------*/
    /*---------------------------------------------------------------------------------*/
    @Slf4j
    @Configuration
    @EnableStateMachineFactory
    @RequiredArgsConstructor
    public static class config extends EnumStateMachineConfigurerAdapter<OrderStatus, OrderEvent> {

        private final OrderService orderService;
        private StateRepository<? extends RepositoryState> stateRepository;
        private TransitionRepository<? extends RepositoryTransition> transitionRepository;
        private StateMachineRuntimePersister<OrderStatus, OrderEvent, String> stateMachineRuntimePersister;

        @Override
        public void configure(StateMachineConfigurationConfigurer<OrderStatus, OrderEvent> config) throws Exception {
            config
                    .withPersistence()
                    .runtimePersister(stateMachineRuntimePersister);
        }

        @Override
        public void configure(StateMachineStateConfigurer<OrderStatus, OrderEvent> states) throws Exception {
            states
                .withStates()
                    .initial(OrderStatus.REQUEST)
                    .state(OrderStatus.QUOTATION)
    //                .state(OrderStatus.DESIGN)          //  Main super-states
    //                .state(OrderStatus.PRODUCTION)      //
    //                .state(OrderStatus.TRANSPORT)       //
                    .state(OrderStatus.CANCEL)
                    .history(OrderStatus.ORDER_RESTORED, StateConfigurer.History.DEEP)          //History state for reverting back
                    .end(OrderStatus.ORDER_COMPLETED)                                   //End state for finalize the order

                /*-----------REQUEST SUPERSTATE-----------*/
                .and()
                .withStates()
                    .parent(OrderStatus.REQUEST)
                    .initial(OrderStatus.REQUESTING)
                    .state(OrderStatus.REQ_AWAIT_APPROVAL)
                        .choice(OrderStatus.REQ_APPROVAL_PROCESS)
                        .state(OrderStatus.REQ_APPROVED)
                        .state(OrderStatus.REQ_DECLINED)
                    .state(OrderStatus.IN_EXCHANGING)

                .and()
                .withStates()
                .parent(OrderStatus.QUOTATION)
                    .initial(OrderStatus.AWAIT_QUO)
                    .state(OrderStatus.QUO_AWAIT_MANA_APPROVAL)
                        .choice(OrderStatus.QUO_MANA_APPROVAL_PROCESS)
                        .state(OrderStatus.QUO_MANA_APPROVED)
                        .state(OrderStatus.QUO_MANA_DECLINED)
                    .state(OrderStatus.QUO_AWAIT_CUST_APPROVAL)
                        .choice(OrderStatus.QUO_CUST_APPROVAL_PROCESS)
                        .state(OrderStatus.QUO_CUST_APPROVED)
                        .state(OrderStatus.QUO_CUST_DECLINED)
                    .state(OrderStatus.AWAIT_TRANSACTION)
                        .choice(OrderStatus.TRANSACTION_PROCESS)
                        .state(OrderStatus.TRANSACTION_APPROVED)
                        .state(OrderStatus.TRANSACTION_DECLINED)

                .and()
                .withStates()
//
//                            /*-----------QUOTATION SUPERSTATE-----------*/
//                .and()
//                .withStates()
//                        .parent(OrderStatus.QUOTATION)
//                        .fork(OrderStatus.QUO_AWAIT_APPROVAL)
//                        .join(OrderStatus.QUO_APPROVED)
//                        .state(OrderStatus.AWAIT_TRANSACTION)
//                        .and()
//                        .withStates()
//                                .parent(OrderStatus.QUO_AWAIT_APPROVAL)         .region("managerApproval")
//                                .initial(OrderStatus.AWAIT_MANAGER_APPROVAL)    .choice(OrderStatus.AWAIT_MANAGER_APPROVAL)
//                                .state(OrderStatus.MANAGER_DECLINED)            .state(OrderStatus.MANAGER_APPROVED)
//                        .and()
//                        .withStates()
//                                .parent(OrderStatus.QUO_AWAIT_APPROVAL)         .region("customerApproval")
//                                .initial(OrderStatus.AWAIT_CUSTOMER_APPROVAL)   .choice(OrderStatus.AWAIT_CUSTOMER_APPROVAL)
//                                .state(OrderStatus.CUSTOMER_APPROVED)           .state(OrderStatus.CUSTOMER_DECLINED)
//
//                            /*-----------DESIGN SUPERSTATE-----------*/
//                .and()
//                .withStates()
//                        .parent(OrderStatus.DESIGN)
//                        .state(OrderStatus.IN_DESIGNING)
//                        .fork(OrderStatus.DES_AWAIT_APPROVAL)
//                        .join(OrderStatus.DES_APPROVED)
//                        .and()
//                        .withStates()
//                                .parent(OrderStatus.DES_AWAIT_APPROVAL)         .region("managerApproval")
//                                .initial(OrderStatus.AWAIT_MANAGER_APPROVAL)    .state(OrderStatus.AWAIT_MANAGER_APPROVAL)
//                                .end(OrderStatus.MANAGER_APPROVED)
//                        .and()
//                        .withStates()
//                                .parent(OrderStatus.DES_AWAIT_APPROVAL)         .region("customerApproval")
//                                .initial(OrderStatus.AWAIT_CUSTOMER_APPROVAL)   .state(OrderStatus.AWAIT_CUSTOMER_APPROVAL)
//                                .end(OrderStatus.CUSTOMER_APPROVED)
//
//                            /*-----------PRODUCTION SUPERSTATE-----------*/
//                .and()
//                .withStates()
//                        .parent(OrderStatus.PRODUCTION)
//                        .state(OrderStatus.IN_PRODUCTION)
//                        .fork(OrderStatus.PRO_AWAIT_APPROVAL)
//                        .join(OrderStatus.FINISHED)
//                        .and()
//                        .withStates()
//                                .parent(OrderStatus.DES_AWAIT_APPROVAL)         .region("managerApproval")
//                                .initial(OrderStatus.AWAIT_MANAGER_APPROVAL)    .state(OrderStatus.AWAIT_MANAGER_APPROVAL)
//                                .end(OrderStatus.MANAGER_APPROVED)
//                        .and()
//                        .withStates()
//                                .parent(OrderStatus.DES_AWAIT_APPROVAL)         .region("customerApproval")
//                                .initial(OrderStatus.AWAIT_CUSTOMER_APPROVAL)   .state(OrderStatus.AWAIT_CUSTOMER_APPROVAL)
//                                .end(OrderStatus.CUSTOMER_APPROVED)
//
//                            /*-----------TRANSPORT SUPERSTATE-----------*/
//                .and()
//                .withStates()
//                        .parent(OrderStatus.TRANSPORT)
//                        .state(OrderStatus.PREPARING)
//                        .state(OrderStatus.SENT)
//                        .state(OrderStatus.DELIVERED)
        ;

    }

        @Override
        public void configure(StateMachineTransitionConfigurer<OrderStatus, OrderEvent> transitions) throws Exception {
            transitions
                .withExternal()
                    .source(OrderStatus.CANCEL).target(OrderStatus.ORDER_RESTORED)
                    .event(OrderEvent.RESTORE_ORDER)

                .and()
                .withLocal()
                    .source(OrderStatus.REQUESTING).target(OrderStatus.REQ_AWAIT_APPROVAL)
                    .event(OrderEvent.REQUEST_RECEIVED)
                    .action(notifyOrderCreateAction())
                .and()
                .withLocal()
                    .source(OrderStatus.REQ_AWAIT_APPROVAL).target(OrderStatus.REQ_APPROVAL_PROCESS)
                    .event(OrderEvent.PROCESS_REQUEST)
                .and()
                .withChoice()
                    .source(OrderStatus.REQ_APPROVAL_PROCESS)
                    .first(OrderStatus.REQ_APPROVED, managerRequestGuard())
                    .last(OrderStatus.REQ_DECLINED)
                .and()
                .withExternal()
                    .source(OrderStatus.REQ_DECLINED).target(OrderStatus.CANCEL)
                    .event(OrderEvent.REQUEST_DECLINE)
                    .action(notifyAction())
                .and()
                .withLocal()
                    .source(OrderStatus.REQ_APPROVED).target(OrderStatus.IN_EXCHANGING)
                    .event(OrderEvent.REQUEST_APPROVE)
                    .action(notifyAction())

                .and()
                .withExternal()
                    .source(OrderStatus.IN_EXCHANGING).target(OrderStatus.AWAIT_QUO)
                    .event(OrderEvent.FINALIZE_IDEA)

                //<editor-fold desc="QUOTATION SUPER-STATE TRANSITIONS" defaultstate="collapsed">
                .and()
                .withExternal()
                    .source(OrderStatus.AWAIT_QUO).target(OrderStatus.QUO_AWAIT_MANA_APPROVAL)
                    .event(OrderEvent.QUOTATION_SEND)
                    .action()
            //</editor-fold>
            //<editor-fold desc="DESIGN SUPER-STATE TRANSITIONS" defaultstate="collapsed">
            //</editor-fold>

            ;

            configureCancelTransition(transitions, OrderStatus.values(), OrderStatus.CANCEL, OrderEvent.CANCEL);
        }

        private void configureCancelTransition(
                StateMachineTransitionConfigurer<OrderStatus, OrderEvent> transitions,
                OrderStatus[] statuses,
                OrderStatus targetState,
                OrderEvent triggerEvent
        ) throws Exception {
            for (OrderStatus status : statuses) {
                if (status != targetState) {
                    transitions
                            .withExternal()
                            .source(status)
                            .target(targetState)
                            .event(triggerEvent)
                            .action(notifyCancelAction());
                }
            }
        }

        //<editor-fold desc="GUARD BEAN" defaultstate="collapsed">
        @Bean
        public Guard<OrderStatus, OrderEvent> managerRequestGuard() {
            return context -> {
                Boolean approved = (Boolean) context.getMessageHeader("managerReply");
                return approved != null && approved;
            };
        }
        //</editor-fold>

        //<editor-fold desc="ACTION BEAN" defaultstate="collapsed">
        @Bean
        public Action<OrderStatus, OrderEvent> managerApproveAction() {
            return context ->
                    context.getExtendedState().getVariables().put("managerApproved", true);
        }

        @Bean
        public Action<OrderStatus, OrderEvent> customerApproveAction() {
            return context ->
                    context.getExtendedState().getVariables().put("customerApproved", true);
        }

        @Bean
        public Action<OrderStatus, OrderEvent> notifyOrderCreateAction() {
            return context -> {
                //GET REPORT OBJECT FROM REPORT SERVICE TRIGGERING THE EVENT AND PASS IT INTO createNewOrder() METHOD
    //            Report incommingRequest = context.getExtendedState().get("report", Report.class);
                Order newOrder = orderService.createNewOrder();
                context.getExtendedState().getVariables().put("order", newOrder);
                //Notify logic using NotificationService for notify MANAGER OF REQUESTING REPORT
                log.info("A new order has been created");
            };
        }

        @Bean
        public Action<OrderStatus, OrderEvent> notifyCustomerAction() {
            return context -> {
                String notifyMessage = context.getExtendedState().get("message", String.class);
                //Notify logic using NotificationService
                log.info(notifyMessage);
            };
        }

        @Bean
        public Action<OrderStatus, OrderEvent> notifySaleStaffAction() {
            return context -> {
                String notifyMessage = context.getExtendedState().get("message", String.class);
                //Notify logic using NotificationService
                log.info(notifyMessage);
            };
        }

        @Bean
        public Action<OrderStatus, OrderEvent> notifyDesignStaffAction() {
            return context -> {
                String notifyMessage = context.getExtendedState().get("message", String.class);
                //Notify logic using NotificationService
                log.info(notifyMessage);
            };
        }

        @Bean
        public Action<OrderStatus, OrderEvent> notifyProductionStaffAction() {
            return context -> {
                String notifyMessage = context.getExtendedState().get("message", String.class);
                //Notify logic using NotificationService
                log.info(notifyMessage);
            };
        }

        @Bean
        public Action<OrderStatus, OrderEvent> notifyManagerAction() {
            return context -> {
                String notifyMessage = context.getExtendedState().get("message", String.class);
                //Notify logic using NotificationService
                log.info(notifyMessage);
            };
        }

        @Bean
        public Action<OrderStatus, OrderEvent> notifyCancelAction() {
            return context -> {
                Order order = context.getExtendedState().get("order", Order.class);
                //Notify logic using NotificationService
                log.info("Cancel order {}", order.getId());
            };
        }
        //</editor-fold>
    }
}