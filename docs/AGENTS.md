# Vueless UI Component Usage Examples for AI Agents

## Introduction
Vueless UI is a Vue.js and Nuxt.js component library built with TypeScript and Tailwind CSS.

This document provides comprehensive use case examples of Vueless UI components based on real-world usage patterns. 
Each example includes when to use the component, common props, events, and combinations.

Use `./node_modules/.cache/vueless/web-types.json` to get the actual and detailed specifications for each component's props, events, slots, and exposes.
Use `./node_modules/vueless` to in details understand Vueless UI components logic.

## Table of Contents

1. [Layout Components](#layout-components)
2. [Form Components](#form-components)
3. [Data Display Components](#data-display-components)
4. [Feedback Components](#feedback-components)
5. [Navigation Components](#navigation-components)
6. [Complex Component Combinations](#complex-component-combinations)

## Layout Components

Layout components form the structural foundation of your UI. 
They provide consistent spacing, alignment, and visual hierarchy while reducing the need for custom CSS or generic HTML elements.

## Layout Component Hierarchy

When building pages, follow this recommended hierarchy:

1. **UPage** - Top-level page container (for routed pages)
2. **UCard** - Content grouping and visual separation
3. **UGroups/UGroup** - Logical content sections with labels
4. **URow/UCol** - Flexible layout arrangement
5. **UDivider** - Content separation and visual breaks
6. **UModal/UModalConfirm** - Overlay containers for focused interactions
7. **UAccordion** - Collapsible content sections

## Best Practices

- **Start with structure**: Begin with layout components before adding content components
- **Minimize custom HTML**: Use Vueless layout components instead of generic `<div>` elements
- **Consistent spacing**: Leverage the built-in `gap` props rather than custom margins
- **Semantic grouping**: Use UGroup for labeled sections, UCard for visual grouping
- **Responsive design**: URow and UCol handle responsive behavior automatically
- **Progressive disclosure**: Use UAccordion for optional or secondary content

### UPage - Page Container

**When to use:** As the main container for top-level page content with navigation and actions. Use this component for:
- Full page views that correspond to application routes (e.g., `/users`, `/settings`, `/dashboard`)
- Pages that need a consistent header structure with title, back navigation, and action buttons
- Main content areas that require standardized spacing and layout

**When NOT to use:**
- Inside modal dialogs or nested components
- For partial page sections or reusable components
- In components that don't represent a complete page view

```vue
<UPage
    :back-to="backRouteParams"
    :back-label="t('title.settings')"
    :title="t('title.users')"
    size="xl"
    variant="soft"
    data-cy="users-page"
>
   <template #actions>
      <UButton :label="t('button.add')" @click="onAddUser" />
   </template>

   <!-- Page content -->
   <UTable :rows="tableItems" :columns="tableHeaders" />
</UPage>
```

### UCard - Content Card

**When to use:** For grouping related content into visually distinct sections. Use this component for:
- Form sections that need visual separation and optional headers/footers
- Content blocks that require consistent spacing and borders
- Dashboard widgets or information panels
- Any content that benefits from being contained within a card-like structure

**When NOT to use:**
- For simple content that doesn't need visual grouping
- When you need complex nested layouts (use URow/UCol instead)
- For full-page containers (use UPage instead)

```vue
<UCard
  :title="t('title.companyInfo')"
  :description="t('description.companyText')"
>
   <UCol>
      <UInput
          v-model="form.companyName"
          :label="t('label.companyName')"
          :error="companyNameError"
      />

     <UInput
       v-model="form.companyEmail"
       :label="t('label.companyEmail')"
       :error="companyEmailError"
     />
   </UCol>

   <template #footer-right>
      <UButton :label="t('button.continue')" @click="onSubmit" />
   </template>
</UCard>
```

### UGroups - Multiple Group Container

**When to use:** As a wrapper when you need to use multiple UGroup components in one page or component. Use this component for:
- Multi-section forms with multiple distinct groups that need proper spacing
- Settings pages with several configuration categories
- Complex layouts where multiple groups need consistent spacing between them
- Pages where groups should be visually separated with larger gaps

**When NOT to use:**
- When you only have a single UGroup (use UGroup directly)
- For simple content that doesn't need group-level organization
- When custom spacing between groups is needed (use manual spacing instead)

**Tip:**
- Use `upperlined` prop for all nested UGroup exclude of first.

```vue
<UGroups data-cy="user-settings-form">
   <UGroup :title="t('label.personalInfo')">
      <UCol>
         <UInput v-model="form.firstName" :label="t('label.firstName')" />
         <UInput v-model="form.lastName" :label="t('label.lastName')" />
         <UInput v-model="form.email" :label="t('label.email')" />
      </UCol>
   </UGroup>

   <UGroup :title="t('label.preferences')" upperlined>
      <UCol>
         <USelect v-model="form.language" :label="t('label.language')" :options="languages" />
         <USelect v-model="form.timezone" :label="t('label.timezone')" :options="timezones" />
         <USwitch v-model="form.notifications" :label="t('label.enableNotifications')" />
      </UCol>
   </UGroup>

   <UGroup :title="t('label.security')" upperlined>
      <UCol>
         <UInputPassword v-model="form.currentPassword" :label="t('label.currentPassword')" />
         <UInputPassword v-model="form.newPassword" :label="t('label.newPassword')" />
         <USwitch v-model="form.twoFactorAuth" :label="t('label.enable2FA')" />
      </UCol>
   </UGroup>
</UGroups>
```

### UGroup - Single Content Group

**When to use:** For organizing related form fields or content into a single logical, labeled section. Use this component for:
- Individual sections within a form that need a title and visual grouping
- Content blocks that benefit from having a header and optional controls
- Sections that might need additional elements in the title area (icons, switches, etc.)
- Single groups that don't require the spacing provided by UGroups

**When NOT to use:**
- For content that doesn't need a title or semantic grouping
- When simple visual separation is sufficient (use UDivider instead)

```vue
<!-- Single group usage -->
<UGroup :title="t('label.paymentMethod')">
   <UCol>
      <URadioGroup
          v-model="form.paymentType"
          :options="paymentTypes"
          name="paymentType"
      />
      <UInput
          v-if="form.paymentType === 'card'"
          v-model="form.cardNumber"
          :label="t('label.cardNumber')"
      />
   </UCol>
</UGroup>

<!-- Group with title controls -->
<UGroup :title="t('label.advancedOptions')">
   <template #after-title>
      <USwitch v-model="showAdvanced" />
   </template>

   <UCol v-if="showAdvanced">
      <UTextarea v-model="form.notes" :label="t('label.notes')" />
      <USelect v-model="form.priority" :label="t('label.priority')" :options="priorities" />
   </UCol>
</UGroup>

<!-- Group with upperline -->
<UGroup :title="t('label.additionalInfo')" upperlined>
   <UCol>
      <UTextarea v-model="form.description" :label="t('label.description')" />
      <UInputFile v-model="form.attachments" :label="t('label.attachments')" multiple />
   </UCol>
</UGroup>
```

### UCol - Column Layout

**When to use:** For vertical stacking of blocks or components with consistent spacing and alignment. Use this component for:
- Form layouts where fields should stack vertically
- Content sections that need consistent vertical spacing
- Mobile-first responsive layouts
- Any vertical arrangement of blocks or components that benefits from controlled gaps and alignment

**When NOT to use:**
- When you need horizontal layouts (use URow instead)
- For complex grid layouts (consider Tailwind CSS Grid)
- When components don't need consistent spacing

```vue
<UCol gap="lg" align="stretch">
   <UInput v-model="form.name" :label="t('label.name')" />
   <UInput v-model="form.email" :label="t('label.email')" />
   <USelect v-model="form.role" :label="t('label.role')" />
</UCol>
```

### URow - Row Layout

**When to use:** For horizontal arrangement of components with flexible alignment and spacing. Use this component for:
- Action button groups (Save, Cancel, etc.)
- Filter controls and search interfaces
- Status indicators with icons and text
- Navigation elements that should align horizontally
- Desktop layouts where blocks or components should sit side-by-side

**When NOT to use:**
- When you need vertical stacking (use UCol instead)
- For complex multi-row layouts (consider Tailwind CSS Grid)
- On mobile when horizontal space is limited (components may wrap poorly)

**Basic Row Layout:**
```vue
<URow gap="md" align="center">
   <UButton :label="t('button.save')" />
   <UButton :label="t('button.cancel')" variant="outlined" />
</URow>
```

**Filter Row with Multiple Components:**
```vue
<URow gap="md" align="end">
   <UDatePickerRange
           v-model:from="filters.dateFrom"
           v-model:to="filters.dateTo"
   />
   <USelect
           v-model="filters.category"
           :options="categories"
           :placeholder="t('placeholder.allCategories')"
   />
   <UButton
           :label="t('button.filter')"
           @click="onApplyFilters"
   />
</URow>
```

**Row with Icons and Controls:**
```vue
<URow align="center" gap="sm">
   <UIcon name="notifications" color="neutral" size="sm" />
   <UText>{{ t('label.notifications') }}</UText>
   <USwitch v-model="settings.notifications" />
</URow>
```

**Row with Status Indicators:**
```vue
<URow align="center" gap="sm">
   <UDot color="success" />
   <UText>{{ t('status.active') }}</UText>
</URow>
```

**Complex Row with Nested Components:**
```vue
<URow align="stretch" justify="between">
   <URow align="center" gap="2xl" class="w-fit">
      <URow>
         <UDatePickerRange
                 v-model="paymentDateRange"
                 :custom-range-button="customRangeButton"
         />
         <FilterButton
                 :filters="filtersForButton"
                 @click="onClickFiltersButton"
         />
         <UButton
                 icon="search"
                 variant="soft"
                 square
                 @click="onShowSearch"
         />
      </URow>
   </URow>
</URow>
```

**Row in Data List Items:**
```vue
<URow gap="xs" align="center">
   <UDot v-if="item.color" :color="item.color" size="md" />
   <div>{{ item.name }}</div>
</URow>
```

**Row with Justify Between:**
```vue
<URow justify="between" align="center">
   <UCol>
      <UNumber
              :value="income.amount"
              :currency="income.currency"
              color="success"
      />
   </UCol>
   <UCol>
      <UNumber
              :value="expense.amount"
              :currency="expense.currency"
              color="error"
      />
   </UCol>
</URow>
```

### UAccordion - Collapsible Content

**When to use:** For organizing content into collapsible sections to save space and improve content discoverability. Use this component for:
- FAQ sections where questions can be expanded to show answers
- Settings or configuration panels with optional advanced options
- Help documentation with expandable topics
- Content that users may want to selectively view
- Long forms where sections can be collapsed after completion

**When NOT to use:**
- For critical information that should always be visible
- When all content sections are typically needed simultaneously
- For simple content that doesn't benefit from being hidden/shown

**Basic Accordion:**
```vue
<UAccordion
    :title="t('title.paymentMethods')"
    :description="t('description.paymentMethodsInfo')"
    size="md"
    @click="onTogglePaymentMethodsAccordion"
/>
```

**Multiple Accordions:**
```vue
<template>
   <UAccordion
       v-for="(faq, index) in faqs"
       :key="index"
       :title="faq.question"
       :description="faq.answer"
       size="lg"
   />
</template>
```

**Accordion with Custom Toggle:**
```vue
<UAccordion
    :title="t('title.advancedSettings')"
    :description="t('description.advancedSettingsInfo')"
>
   <template #toggle="{ opened }">
      <UButton
          :label="opened ? t('button.hide') : t('button.show')"
          variant="outlined"
          size="sm"
      />
   </template>
</UAccordion>
```

### UDivider - Content Separator

**When to use:** For visually separating content sections and creating clear breaks between different areas. Use this component for:
- Separating distinct content sections within a page or form
- Creating visual breaks in long content to improve readability
- Adding labeled separators to indicate content transitions
- Dividing content with semantic meaning (e.g., "Personal Info" vs "Contact Details")
- Creating visual hierarchy in dense layouts

**When NOT to use:**
- When simple spacing (margins/padding) would suffice
- Between every single component (can create visual noise)
- In place of a proper semantic HTML structure

**Basic Divider:**
```vue
<UDivider />
```

**Divider with Label:**
```vue
<UDivider :label="t('label.personalInfo')" />
```

**Divider with Icon:**
```vue
<UDivider icon="settings" />
```

**Styled Dividers:**
```vue
<!-- Dashed divider -->
<UDivider dashed size="sm" />

<!-- Dotted divider -->
<UDivider dotted color="primary" />

<!-- Vertical divider -->
<UDivider vertical />
```

**Divider in Content Sections:**
```vue
<UCol>
   <UText>{{ t('description.section1') }}</UText>

   <UDivider :label="t('label.nextSection')" size="md" />

   <UText>{{ t('description.section2') }}</UText>
</UCol>
```

### UModal - Modal Dialogs

**When to use:** For displaying content that requires user attention or interaction in an overlay container. Use this component for:
- Forms that need to be completed without leaving the current page context
- Detailed views of items (e.g., viewing transaction details, user profiles)
- Complex interactions that require focus (e.g., multi-step wizards, advanced filters)
- Content that should temporarily take over the interface
- Workflows that need to be completed before returning to the main content

**When NOT to use:**
- For simple confirmations (use UModalConfirm instead)
- For notifications or alerts (use UAlert or UNotify instead)
- When the content could fit naturally in the page layout
- For navigation between different pages (use routing instead)

**Basic Modal:**
```vue
<UModal
    v-model="isShownModal"
    :title="t('title.addCounterparty')"
    size="lg"
>
   <CounterpartyForm v-model="form" />

   <template #footer-left>
      <UButton :label="t('button.add')" @click="onSubmit" />
      <UButton
          :label="t('button.close')"
          variant="outlined"
          @click="onClose"
      />
   </template>
</UModal>
```

**Modal with Complex Content:**
```vue
<UModal
    v-model="isShownFilterModal"
    :title="t('title.advancedFilters')"
    size="xl"
>
   <UGroups>
      <UGroup :title="t('label.general')">
        <UDatePickerRange
          v-model:from="filters.dateFrom"
          v-model:to="filters.dateTo"
        />
        
        <USelect
          v-model="filters.accounts"
          :options="accountOptions"
        />
        
         <USelect
             v-model="filters.categories"
             :options="categoryOptions"
             multiple
             searchable
         />
      </UGroup>
   </UGroups>

   <template #footer-right>
      <UButton :label="t('button.apply')" @click="onApplyFilters" />
      <UButton
          :label="t('button.reset')"
          variant="outlined"
          @click="onResetFilters"
      />
   </template>
</UModal>
```

### UModalConfirm - Confirmation Dialog

**When to use:** For confirming destructive or important actions that require explicit user consent. Use this component for:
- Delete operations that cannot be undone (e.g., deleting users, transactions, or data)
- Actions with significant consequences (e.g., publishing content, sending emails, financial transactions)
- Operations that affect multiple items or other users
- Critical workflow steps that need explicit confirmation
- Actions that might result in data loss or irreversible changes

**When NOT to use:**
- For simple form submissions that can be undone
- For navigation confirmations (unless data would be lost)
- When the action is easily reversible
- For complex forms or multi-step processes (use UModal instead)

**Basic Confirmation:**
```vue
<UModalConfirm
    v-model="isShownModal"
    :title="t('title.deleteUser')"
    :confirm-label="t('button.delete')"
    color="error"
    @confirm="onConfirmDelete"
>
   <UText :html="t('description.deleteConfirmation', { name: user.name })" />
</UModalConfirm>
```

**Advanced Confirmation with Details:**
```vue
<UModalConfirm
    v-model="isShownDeleteModal"
    :title="t('title.deleteTransactions')"
    :confirm-label="t('button.delete')"
    :confirm-disabled="!isConfirmed"
    color="error"
    size="lg"
    @confirm="onConfirmDelete"
>
   <!-- Warning Alert -->
   <UAlert 
     color="error" 
     class="mb-4" 
     icon="warning"
     :title="$t('warning.irreversibleAction')"
     :description="$t('description.deleteWarning')"
   />

   <!-- Summary Information -->
   <UCard variant="soft" class="mb-4">
      <UCol gap="sm">
         <URow justify="between">
            <UText>{{ t('label.itemsToDelete') }}:</UText>
            <UText weight="medium">{{ selectedItems.length }}</UText>
         </URow>
         <URow justify="between">
            <UText>{{ t('label.totalValue') }}:</UText>
            <UNumber :value="totalValue" :currency="currency" />
         </URow>
      </UCol>
   </UCard>

   <!-- Confirmation Checkbox -->
   <UCheckbox
       v-model="isConfirmed"
       :label="t('label.confirmDeletion')"
   />

   <template #footer-left>
      <UButton
          :label="t('button.exportFirst')"
          variant="outlined"
          @click="onExportBeforeDelete"
      />
   </template>
</UModalConfirm>
```

## Form Components

### UInput - Text Input Field

**When to use:** For collecting text data like names, emails, descriptions, and search queries.

**Basic Usage:**
```vue
<UInput
        v-model="form.email"
        :label="t('label.email')"
        :placeholder="t('placeholder.email')"
        :error="emailError"
        inputmode="email"
        data-cy="email-input"
/>
```

**Advanced Usage with Slots:**
```vue
<UInput
        v-model="form.amount"
        :label="t('label.amount')"
        :error="validation.moneyError.value"
        data-cy="money-input"
>
   <template #right>
      <UIcon
              v-if="showUndoButton"
              name="close"
              interactive
              color="neutral"
              @click="onClickUndo"
      />
   </template>
</UInput>
```



### UInputPassword - Password Input

**When to use:** For password fields with built-in show/hide functionality.

```vue
<UInputPassword
        v-model="form.password"
        :label="t('label.password')"
        :placeholder="t('placeholder.password')"
        :error="passwordError"
        data-cy="password-input"
/>
```

### USelect - Dropdown Selection

**When to use:** For selecting from predefined options, with support for search, grouping, and multiple selection.

**Basic Single Selection:**
```vue
<USelect
        v-model="form.roleId"
        :label="t('label.role')"
        :placeholder="t('placeholder.role')"
        :error="userRoleError"
        :options="rolesForSelect"
        :disabled="form.isOwner"
/>
```

**Multiple Selection with Groups:**
```vue
<USelect
        v-model="form.categoryIds"
        :label="t('label.categories')"
        :options="categoriesForSelect"
        group-label-key="category"
        group-value-key="subCategories"
        multiple
        searchable
        data-cy="categories-multiselect"
>
   <template #before-option="{ option }">
      <UDot v-if="option.color" :color="option.color" class="my-auto mr-1" />
   </template>
</USelect>
```

**With Add Option Functionality:**
```vue
<USelect
        v-model="form.bankAccountId"
        :label="t('label.bankAccount')"
        :options="bankAccountOptions"
        add-option
        @add="onAddBankAccount"
/>
```



### UCheckbox & UCheckboxGroup - Checkbox Controls

**When to use:** For boolean selections or multiple choice selections.

**Single Checkbox:**
```vue
<UCheckbox
        v-model="form.isActive"
        :label="t('label.isActive')"
/>
```

**Checkbox Group:**
```vue
<UCheckboxGroup
        v-model="checkedItems"
        :options="checkboxOptions"
        name="permissions"
/>
```

### URadio & URadioGroup - Radio Button Controls

**When to use:** For single selection from multiple options.

```vue
<URadioGroup
        v-model="form.transactionType"
        :options="transactionTypes"
        name="transactionType"
/>
```

### UDatePicker & UDatePickerRange - Date Selection

**When to use:** For date and time selection, including date ranges.

**Single Date:**
```vue
<UDatePicker
        v-model="form.date"
        :label="t('label.date')"
        :error="dateError"
/>
```

**Date Range:**
```vue
<UDatePickerRange
        v-model:from="form.dateFrom"
        v-model:to="form.dateTo"
        :from-label="t('label.dateFrom')"
        :to-label="t('label.dateTo')"
/>
```

### UTextarea - Multi-line Text Input

**When to use:** For longer text content like comments, descriptions, or notes.

```vue
<UTextarea
        v-model="form.comment"
        :label="t('label.comment')"
        :placeholder="t('placeholder.comment')"
        rows="4"
/>
```



## Data Display Components

### UTable - Data Table

**When to use:** For displaying tabular data with sorting, selection, and custom cell rendering.

**Basic Table:**
```vue
<UTable
        :rows="tableItems"
        :columns="tableHeaders"
        @click-row="onClickRow"
/>
```

**Advanced Table with Selection and Custom Cells:**
```vue
<UTable
        ref="tableRef"
        v-model:selected-rows="checkedItems"
        :rows="transactionsForTable"
        :columns="tableHeaders"
        :selectable="hasEditRights"
        :loading="isLoading"
        sticky-header
        compact
        data-cy="transaction-table"
        @click-row="onClickRow"
>
   <template #header-actions="{ selectedRows }">
      <UButton
              variant="ghost"
              :label="t('button.delete')"
              @click="onDeleteSelected"
      />
   </template>

   <template #cell-status="{ value }">
      <UBadge :label="value.label" :color="value.variant" />
   </template>

   <template #cell-money="{ value }">
      <UNumber
              :value="value.amount"
              :currency="value.currency"
              :color="value.isPositive ? 'success' : 'error'"
      />
   </template>

   <template #footer>
      <td colspan="3">
         <UButton
                 v-if="hasMorePages"
                 :label="t('button.showMore')"
                 variant="soft"
                 @click="onLoadMore"
         />
      </td>
   </template>
</UTable>
```

### UBadge - Status Indicator

**When to use:** For displaying status, categories, or labels.

```vue
<UBadge
        :label="user.status.label"
        :color="user.status.color"
        variant="soft"
        round
/>
```

### UNumber - Formatted Numbers

**When to use:** For displaying monetary values, percentages, or formatted numbers.

```vue
<UNumber
        :value="transaction.amount"
        :currency="transaction.currency.symbol"
        :color="transaction.isPositive ? 'success' : 'error'"
        :sign="transaction.isPositive ? '+' : '-'"
        align="right"
        currency-space
/>
```

### UAvatar - User Avatar

**When to use:** For displaying user profile pictures or initials.

```vue
<UAvatar
        :src="user.avatar"
        :alt="user.name"
        :label="user.initials"
        size="lg"
        color="primary"
/>
```

## Feedback Components

### UAlert - Alert Messages

**When to use:** For displaying important information, warnings, or errors.

```vue
<UAlert
        color="warning"
        size="sm"
        variant="soft"
>
   <p>{{ t('warning.dataWillBeLost') }}</p>
</UAlert>
```



### UNotify - Notifications

**When to use:** For showing success, error, or info messages to users.

```javascript
import { notifySuccess, notifyError } from 'vueless';

// Success notification
notifySuccess(t('message.userCreated'));

// Error notification
notifyError(t('error.userCreationFailed'));
```

## Navigation Components

### UButton - Action Buttons

**When to use:** For triggering actions, navigation, or form submission.

**Primary Action:**
```vue
<UButton
        :label="t('button.save')"
        color="primary"
        size="lg"
        @click="onSave"
/>
```

**Secondary Action:**
```vue
<UButton
        :label="t('button.cancel')"
        variant="outlined"
        @click="onCancel"
/>
```

**Icon Button:**
```vue
<UButton
        icon="add"
        variant="soft"
        size="sm"
        filled
        round
        square
        @click="onAdd"
/>
```

### ULink - Navigation Links

**When to use:** For navigation between pages or external links.

```vue
<ULink
        :to="{ name: 'user.edit', params: { id: user.id } }"
        :label="user.name"
        underlined
        color="primary"
/>
```

### UDropdownButton & UDropdownList - Dropdown Menus

**When to use:** For showing contextual actions or navigation options.

```vue
<UDropdownButton
        :label="t('button.actions')"
        :options="actionOptions"
        @click-option="onActionClick"
/>
```

```vue
<UDropdownList
        :options="menuOptions"
        y-position="bottom"
        x-position="right"
        @click-option="onMenuClick"
/>
```

### UTabs & UTab - Tab Navigation

**When to use:** For organizing content into multiple views within the same page.

```vue
<UTabs v-model="activeTab">
   <UTab name="general" :label="t('tab.general')">
      <GeneralSettings v-model="settings.general" />
   </UTab>

   <UTab name="security" :label="t('tab.security')">
      <SecuritySettings v-model="settings.security" />
   </UTab>
</UTabs>
```

## Complex Component Combinations

### User Management Form

**Use case:** Creating or editing user accounts with role assignment and validation.

```vue
<template>
   <UPage :title="isEdit ? t('title.editUser') : t('title.addUser')">
      <UCard>
         <UCol>
            <UInput
                    v-model="form.name"
                    :label="t('label.userName')"
                    :error="validation.nameError"
                    :disabled="isEdit"
            />

            <UInput
                    v-model="form.email"
                    :label="t('label.email')"
                    :error="validation.emailError"
                    inputmode="email"
            />

            <USelect
                    v-model="form.roleId"
                    :label="t('label.role')"
                    :options="rolesForSelect"
                    :error="validation.roleError"
                    :disabled="form.isOwner"
            />

            <UCheckbox
                    v-model="form.isActive"
                    :label="t('label.isActive')"
            />
         </UCol>

         <template #footer-right>
            <UButton
                    :label="t('button.save')"
                    @click="onSave"
            />
            <UButton
                    :label="t('button.cancel')"
                    variant="outlined"
                    @click="onCancel"
            />
         </template>
      </UCard>
   </UPage>
</template>
```

### Transaction Filter Modal

**Use case:** Complex filtering interface with multiple criteria and saved presets.

```vue
<template>
   <UModal
           v-model="isShown"
           :title="t('title.filter')"
           size="xl"
   >
      <UGroups>
         <UGroup :title="t('label.main')">
            <UCol>
               <USelect
                       v-model="form.transactionTypes"
                       :label="t('label.transactionType')"
                       :options="transactionTypes"
                       multiple
               />

               <UDatePickerRange
                       v-model:from="form.dateFrom"
                       v-model:to="form.dateTo"
                       :from-label="t('label.dateFrom')"
                       :to-label="t('label.dateTo')"
               />

               <UInputNumber
                       v-model="form.amountFrom"
                       :label="t('label.amountFrom')"
               />
            </UCol>
         </UGroup>

         <UGroup :title="t('label.advanced')">
            <UCol>
               <USelect
                       v-model="form.categories"
                       :label="t('label.categories')"
                       :options="categoriesForSelect"
                       multiple
                       searchable
               />

               <UCheckbox
                       v-model="form.includeSubcategories"
                       :label="t('label.includeSubcategories')"
               />
            </UCol>
         </UGroup>
      </UGroups>

      <template #footer-left>
         <UButton :label="t('button.apply')" @click="onApply" />
         <UButton
                 :label="t('button.savePreset')"
                 variant="outlined"
                 @click="onSavePreset"
         />
      </template>

      <template #footer-right>
         <UButton
                 :label="t('button.reset')"
                 variant="ghost"
                 @click="onReset"
         />
      </template>
   </UModal>
</template>
```

This document provides comprehensive examples of Vueless UI component usage patterns that AI agents can reference when building user interfaces. Each component includes practical use cases, common prop configurations, and real-world combinations based on the Fine.my application.

## Additional Specialized Components

### USwitch - Toggle Switch

**When to use:** For enabling/disabling features or binary settings.

```vue
<USwitch
        v-model="isActiveAutofill"
        :label="t('label.enableAutofill')"
/>

<!-- In a group header -->
<UGroup :title="t('label.notifications')">
   <template #after-title>
      <URow align="center">
         <UIcon name="notifications" color="neutral" size="sm" />
         <USwitch v-model="settings.notifications" />
      </URow>
   </template>
</UGroup>
```

### UProgress - Progress Indicators

**When to use:** For showing loading states or progress of operations.

```vue
<UProgress
        :value="uploadProgress"
        :max="100"
        color="primary"
        size="md"
/>
```

### UColorPicker - Color Selection

**When to use:** For selecting colors for categories, tags, or themes.

```vue
<UColorPicker
        v-model="form.categoryColor"
        :label="t('label.categoryColor')"
        :colors="availableColors"
/>
```

### UInputRating - Star Rating

**When to use:** For rating or scoring functionality.

```vue
<UInputRating
        v-model="form.rating"
        :label="t('label.rating')"
        :max="5"
        size="lg"
/>
```

### UInputSearch - Search Input

**When to use:** For search functionality with built-in search icon and clear button.

```vue
<UInputSearch
        v-model="searchQuery"
        :placeholder="t('placeholder.searchTransactions')"
        @search="onSearch"
        @clear="onClearSearch"
/>
```

### UDot - Status Indicator

**When to use:** For showing status, color coding, or small indicators.

```vue
<!-- In a select option -->
<template #before-option="{ option }">
   <UDot
           v-if="option.color"
           :color="option.color"
           class="my-auto mr-1"
   />
</template>

<!-- As status indicator -->
<URow align="center" gap="sm">
   <UDot color="success" />
   <UText>{{ t('status.active') }}</UText>
</URow>
```

## Best Practices and Configuration



### Data Attributes for Testing

Always include `data-cy` attributes for testing:

```vue
<UButton
        :label="t('button.save')"
        data-cy="save-button"
        @click="onSave"
/>

<UInput
        v-model="form.email"
        :label="t('label.email')"
        data-cy="email-input"
/>
```

### Accessibility Considerations

Use proper labeling and ARIA attributes:

```vue
<UInput
        v-model="form.amount"
        :label="t('label.amount')"
        inputmode="decimal"
        :aria-describedby="hasError ? 'amount-error' : undefined"
/>

<UButton
        icon="delete"
        :aria-label="t('button.delete')"
        @click="onDelete"
/>
```

### Responsive Design Patterns

Use responsive classes and conditional rendering:

```vue
<UPage>
   <template #actions>
      <!-- Mobile: Show icon only -->
      <UIcon v-if="isPhoneGroup" size="xl" name="add" @click="onAdd" />
      <!-- Desktop: Show full button -->
      <UButton v-else :label="t('button.add')" @click="onAdd" />
   </template>
</UPage>
```

### Error Handling Patterns

Consistent error display across forms:

```vue
<UInput
        v-model="form.email"
        :label="t('label.email')"
        :error="validation.emailError"
        :disabled="isLoading"
/>

<UAlert v-if="hasGlobalError" color="error">
   {{ globalErrorMessage }}
</UAlert>
```

### Loading States

Show loading states for better UX:

```vue
<UTable
        :rows="tableData"
        :columns="tableHeaders"
        :loading="isLoading.transactions"
        @click-row="onClickRow"
/>

<UButton
        :label="isLoading ? t('button.saving') : t('button.save')"
        :disabled="isLoading"
        @click="onSave"
/>
```

## Component Combination Patterns

### Master-Detail View

```vue
<template>
   <UPage :title="t('title.transactions')">
      <!-- Filters -->
      <UCard class="mb-6">
         <URow gap="md" align="end">
            <UDatePickerRange
                    v-model:from="filters.dateFrom"
                    v-model:to="filters.dateTo"
            />
            <USelect
                    v-model="filters.category"
                    :options="categories"
                    :placeholder="t('placeholder.allCategories')"
            />
            <UButton
                    :label="t('button.filter')"
                    @click="onApplyFilters"
            />
         </URow>
      </UCard>

      <!-- Data Table -->
      <UTable
              v-model:selected-rows="selectedRows"
              :rows="transactions"
              :columns="tableColumns"
              selectable
              @click-row="onSelectTransaction"
      >
         <template #header-actions>
            <UDropdownButton
                    :label="t('button.actions')"
                    :options="bulkActions"
                    :disabled="!selectedRows.length"
                    @click-option="onBulkAction"
            />
         </template>
      </UTable>
   </UPage>
</template>
```

### Multi-Step Form

```vue
<template>
   <UModal v-model="isShown" :title="t('title.addTransaction')">
      <UTabs v-model="currentStep">
         <UTab name="basic" :label="t('step.basicInfo')">
            <UCol>
               <UInputNumber
                       v-model="form.amount"
                       :label="t('label.amount')"
                       :error="validation.amountError"
               />
               <USelect
                       v-model="form.type"
                       :label="t('label.type')"
                       :options="transactionTypes"
               />
            </UCol>
         </UTab>

         <UTab name="details" :label="t('step.details')">
            <UCol>
               <USelect
                       v-model="form.category"
                       :label="t('label.category')"
                       :options="categories"
               />
               <UTextarea
                       v-model="form.description"
                       :label="t('label.description')"
               />
            </UCol>
         </UTab>
      </UTabs>

      <template #footer-left>
         <UButton
                 v-if="currentStep !== 'basic'"
                 :label="t('button.previous')"
                 variant="outlined"
                 @click="onPreviousStep"
         />
         <UButton
                 :label="isLastStep ? t('button.save') : t('button.next')"
                 @click="onNextStep"
         />
      </template>
   </UModal>
</template>
```

### Data Table with Advanced Features

**Use case:** Complex data table with filtering, sorting, selection, and inline editing.

```vue
<template>
   <UPage :title="t('title.transactions')">
      <!-- Header with Search and Actions -->
      <URow align="stretch" justify="between" class="mb-6">
         <URow align="center" gap="md">
            <UInputSearch
                    v-model="searchQuery"
                    :placeholder="t('placeholder.searchTransactions')"
                    @search="onSearch"
            />
            <FilterButton
                    :filters="activeFilters"
                    @click="onShowFilters"
            />
         </URow>

         <UButton
                 :label="t('button.addTransaction')"
                 icon="add"
                 @click="onAddTransaction"
         />
      </URow>

      <!-- Advanced Table -->
      <UTable
              ref="tableRef"
              v-model:selected-rows="selectedTransactions"
              :rows="transactionsForTable"
              :columns="tableHeaders"
              :loading="isLoading"
              :selectable="hasEditRights"
              sticky-header
              compact
              @click-row="onClickRow"
      >
         <!-- Header Actions for Bulk Operations -->
         <template #header-actions="{ selectedRows }">
            <URow gap="sm">
               <UButton
                       :label="t('button.delete')"
                       variant="ghost"
                       color="error"
                       size="sm"
                       :disabled="!selectedRows.length"
                       @click="onBulkDelete"
               />
               <UButton
                       :label="t('button.export')"
                       variant="ghost"
                       size="sm"
                       :disabled="!selectedRows.length"
                       @click="onBulkExport"
               />
            </URow>
         </template>

         <!-- Custom Cell Renderers -->
         <template #cell-status="{ value }">
            <UBadge
                    :label="value.label"
                    :color="value.color"
                    variant="soft"
            />
         </template>

         <template #cell-amount="{ value, row }">
            <UNumber
                    :value="value.amount"
                    :currency="value.currency"
                    :color="value.isPositive ? 'success' : 'error'"
                    :sign="value.isPositive ? '+' : '-'"
                    align="right"
            />
         </template>

         <template #cell-category="{ value, row }">
            <URow align="center" gap="xs">
               <UDot v-if="value.color" :color="value.color" />
               <span>{{ value.name }}</span>
            </URow>
         </template>

         <!-- Pagination Footer -->
         <template #after-last-row="{ colsCount }">
            <td :colspan="colsCount" class="text-center">
               <UButton
                       v-if="hasMorePages"
                       :label="t('button.loadMore')"
                       variant="soft"
                       size="sm"
                       @click="onLoadMore"
               />
            </td>
         </template>
      </UTable>
   </UPage>
</template>
```

### Dashboard with Cards and Charts

**Use case:** Financial dashboard with multiple data visualization cards.

```vue
<template>
   <UPage :title="t('title.dashboard')" size="full">
      <!-- Dashboard Header -->
      <URow justify="between" align="center" class="mb-6">
         <URow align="center" gap="md">
            <UDatePickerRange
                    v-model:from="filters.dateFrom"
                    v-model:to="filters.dateTo"
                    @change="onDateRangeChange"
            />
            <USelect
                    v-model="filters.company"
                    :options="companies"
                    :placeholder="t('placeholder.allCompanies')"
            />
         </URow>

         <UDropdownButton
                 :label="t('button.export')"
                 :options="exportOptions"
                 @click-option="onExport"
         />
      </URow>

      <!-- Dashboard Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
         <!-- Balance Card -->
         <UCard>
            <UCol gap="sm">
               <URow justify="between" align="center">
                  <UText size="sm" color="muted">{{ t('label.totalBalance') }}</UText>
                  <UIcon name="account_balance_wallet" color="primary" />
               </URow>
               <UNumber
                       :value="dashboard.totalBalance"
                       :currency="baseCurrency.symbol"
                       size="xl"
                       weight="bold"
               />
               <URow align="center" gap="xs">
                  <UIcon
                          :name="dashboard.balanceChange.isPositive ? 'trending_up' : 'trending_down'"
                          :color="dashboard.balanceChange.isPositive ? 'success' : 'error'"
                          size="sm"
                  />
                  <UText
                          :color="dashboard.balanceChange.isPositive ? 'success' : 'error'"
                          size="sm"
                  >
                     {{ dashboard.balanceChange.percentage }}%
                  </UText>
               </URow>
            </UCol>
         </UCard>

         <!-- Income Card -->
         <UCard>
            <UCol gap="sm">
               <URow justify="between" align="center">
                  <UText size="sm" color="muted">{{ t('label.income') }}</UText>
                  <UIcon name="trending_up" color="success" />
               </URow>
               <UNumber
                       :value="dashboard.income"
                       :currency="baseCurrency.symbol"
                       color="success"
                       size="xl"
                       weight="bold"
               />
            </UCol>
         </UCard>

         <!-- Expenses Card -->
         <UCard>
            <UCol gap="sm">
               <URow justify="between" align="center">
                  <UText size="sm" color="muted">{{ t('label.expenses') }}</UText>
                  <UIcon name="trending_down" color="error" />
               </URow>
               <UNumber
                       :value="dashboard.expenses"
                       :currency="baseCurrency.symbol"
                       color="error"
                       size="xl"
                       weight="bold"
               />
            </UCol>
         </UCard>

         <!-- Transactions Count -->
         <UCard>
            <UCol gap="sm">
               <URow justify="between" align="center">
                  <UText size="sm" color="muted">{{ t('label.transactions') }}</UText>
                  <UIcon name="receipt" color="info" />
               </URow>
               <UText size="xl" weight="bold">{{ dashboard.transactionCount }}</UText>
            </UCol>
         </UCard>
      </div>

      <!-- Recent Transactions -->
      <UCard>
         <template #header>
            <URow justify="between" align="center">
               <UText size="lg" weight="bold">{{ t('title.recentTransactions') }}</UText>
               <ULink :to="{ name: 'transactions' }" :label="t('button.viewAll')" />
            </URow>
         </template>

         <UTable
                 :rows="recentTransactions"
                 :columns="transactionColumns"
                 compact
                 @click-row="onViewTransaction"
         />
      </UCard>
   </UPage>
</template>
```

### Settings Page with Grouped Forms

**Use case:** Complex settings interface with multiple configuration sections.

```vue
<template>
   <UPage :title="t('title.settings')" size="lg">
      <UTabs v-model="activeTab">
         <!-- General Settings Tab -->
         <UTab name="general" :label="t('tab.general')">
            <UGroups>
               <UGroup :title="t('group.profile')">
                  <UCol>
                     <URow gap="md" align="start">
                        <UAvatar
                                :src="user.avatar"
                                :label="user.initials"
                                size="xl"
                                editable
                                @change="onAvatarChange"
                        />
                        <UCol class="flex-1">
                           <UInput
                                   v-model="settings.profile.name"
                                   :label="t('label.fullName')"
                                   :error="validation.nameError"
                           />
                           <UInput
                                   v-model="settings.profile.email"
                                   :label="t('label.email')"
                                   :error="validation.emailError"
                                   inputmode="email"
                           />
                        </UCol>
                     </URow>
                  </UCol>
               </UGroup>

               <UGroup :title="t('group.preferences')">
                  <UCol>
                     <USelect
                             v-model="settings.language"
                             :label="t('label.language')"
                             :options="languages"
                     />
                     <USelect
                             v-model="settings.currency"
                             :label="t('label.baseCurrency')"
                             :options="currencies"
                     />
                     <USelect
                             v-model="settings.dateFormat"
                             :label="t('label.dateFormat')"
                             :options="dateFormats"
                     />
                  </UCol>
               </UGroup>

               <UGroup :title="t('group.notifications')">
                  <UCol>
                     <URow justify="between" align="center">
                        <UCol>
                           <UText weight="medium">{{ t('label.emailNotifications') }}</UText>
                           <UText size="sm" color="muted">{{ t('description.emailNotifications') }}</UText>
                        </UCol>
                        <USwitch v-model="settings.notifications.email" />
                     </URow>

                     <URow justify="between" align="center">
                        <UCol>
                           <UText weight="medium">{{ t('label.pushNotifications') }}</UText>
                           <UText size="sm" color="muted">{{ t('description.pushNotifications') }}</UText>
                        </UCol>
                        <USwitch v-model="settings.notifications.push" />
                     </URow>
                  </UCol>
               </UGroup>
            </UGroups>
         </UTab>

         <!-- Security Tab -->
         <UTab name="security" :label="t('tab.security')">
            <UGroups>
               <UGroup :title="t('group.password')">
                  <UCol>
                     <UInputPassword
                             v-model="passwordForm.current"
                             :label="t('label.currentPassword')"
                             :error="validation.currentPasswordError"
                     />
                     <UInputPassword
                             v-model="passwordForm.new"
                             :label="t('label.newPassword')"
                             :error="validation.newPasswordError"
                     />
                     <UInputPassword
                             v-model="passwordForm.confirm"
                             :label="t('label.confirmPassword')"
                             :error="validation.confirmPasswordError"
                     />
                     <UButton
                             :label="t('button.changePassword')"
                             @click="onChangePassword"
                     />
                  </UCol>
               </UGroup>

               <UGroup :title="t('group.twoFactor')">
                  <UCol>
                     <URow justify="between" align="center">
                        <UCol>
                           <UText weight="medium">{{ t('label.twoFactorAuth') }}</UText>
                           <UText size="sm" color="muted">{{ t('description.twoFactorAuth') }}</UText>
                        </UCol>
                        <USwitch
                                v-model="settings.security.twoFactor"
                                @change="onToggleTwoFactor"
                        />
                     </URow>
                  </UCol>
               </UGroup>
            </UGroups>
         </UTab>
      </UTabs>

      <!-- Save Actions -->
      <UCard class="mt-6">
         <template #footer-right>
            <URow gap="sm">
               <UButton
                       :label="t('button.reset')"
                       variant="outlined"
                       @click="onReset"
               />
               <UButton
                       :label="t('button.saveChanges')"
                       :loading="isSaving"
                       @click="onSave"
               />
            </URow>
         </template>
      </UCard>
   </UPage>
</template>
```

### Confirmation Dialog with Complex Content

**Use case:** Advanced confirmation dialog with detailed information and multiple actions.

```vue
<template>
   <UModalConfirm
           v-model="isShown"
           :title="t('title.deleteTransactions')"
           :confirm-label="t('button.delete')"
           :confirm-disabled="!isConfirmed"
           color="error"
           size="lg"
           @confirm="onConfirmDelete"
   >
      <!-- Warning Alert -->
      <UAlert color="error" class="mb-4">
         <URow align="start" gap="sm">
            <UIcon name="warning" />
            <UCol>
               <UText weight="medium">{{ t('warning.irreversibleAction') }}</UText>
               <UText size="sm">{{ t('description.deleteWarning') }}</UText>
            </UCol>
         </URow>
      </UAlert>

      <!-- Transaction Summary -->
      <UCard variant="soft" class="mb-4">
         <UCol gap="sm">
            <UText weight="medium">{{ t('label.transactionsToDelete') }}</UText>

            <URow justify="between">
               <UText>{{ t('label.count') }}:</UText>
               <UText weight="medium">{{ selectedTransactions.length }}</UText>
            </URow>

            <URow justify="between">
               <UText>{{ t('label.totalAmount') }}:</UText>
               <UNumber
                       :value="totalAmount"
                       :currency="baseCurrency.symbol"
                       weight="medium"
               />
            </URow>

            <URow justify="between">
               <UText>{{ t('label.dateRange') }}:</UText>
               <UText weight="medium">{{ formatDateRange(dateRange) }}</UText>
            </URow>
         </UCol>
      </UCard>

      <!-- Affected Categories -->
      <UGroup :title="t('label.affectedCategories')" class="mb-4">
         <URow gap="xs" wrap>
            <UBadge
                    v-for="category in affectedCategories"
                    :key="category.id"
                    :label="category.name"
                    variant="soft"
            >
               <template #before>
                  <UDot :color="category.color" />
               </template>
            </UBadge>
         </URow>
      </UGroup>

      <!-- Confirmation Checkbox -->
      <UCheckbox
              v-model="isConfirmed"
              :label="t('label.confirmDeletion')"
              class="mt-4"
      />

      <!-- Additional Actions -->
      <template #footer-left>
         <UButton
                 :label="t('button.exportFirst')"
                 variant="outlined"
                 @click="onExportBeforeDelete"
         />
      </template>
   </UModalConfirm>
</template>
```

### Search and Filter Interface

**Use case:** Advanced search interface with multiple filter criteria and real-time results.

```vue
<template>
   <UPage :title="t('title.search')" size="xl">
      <!-- Search Header -->
      <UCard class="mb-6">
         <UCol gap="md">
            <!-- Main Search -->
            <UInputSearch
                    v-model="searchQuery"
                    :placeholder="t('placeholder.searchEverything')"
                    size="lg"
                    @search="onSearch"
                    @clear="onClearSearch"
            />

            <!-- Quick Filters -->
            <URow gap="sm" wrap>
               <UButton
                       v-for="filter in quickFilters"
                       :key="filter.key"
                       :label="filter.label"
                       :variant="activeFilters.includes(filter.key) ? 'solid' : 'outlined'"
                       size="sm"
                       @click="onToggleQuickFilter(filter.key)"
               />
            </URow>

            <!-- Advanced Filters Toggle -->
            <URow justify="between" align="center">
               <UButton
                       :label="t('button.advancedFilters')"
                       variant="ghost"
                       :icon="showAdvancedFilters ? 'expand_less' : 'expand_more'"
                       @click="showAdvancedFilters = !showAdvancedFilters"
               />

               <UText v-if="searchResults.total" size="sm" color="muted">
                  {{ t('label.resultsFound', { count: searchResults.total }) }}
               </UText>
            </URow>

            <!-- Advanced Filters Panel -->
            <UCol v-if="showAdvancedFilters" gap="md" class="pt-4 border-t">
               <URow gap="md" wrap>
                  <UDatePickerRange
                          v-model:from="filters.dateFrom"
                          v-model:to="filters.dateTo"
                          :from-label="t('label.dateFrom')"
                          :to-label="t('label.dateTo')"
                  />

                  <USelect
                          v-model="filters.categories"
                          :label="t('label.categories')"
                          :options="categories"
                          multiple
                          searchable
                  />

                  <UInputNumber
                          v-model="filters.amountMin"
                          :label="t('label.amountMin')"
                  />

                  <UInputNumber
                          v-model="filters.amountMax"
                          :label="t('label.amountMax')"
                  />
               </URow>

               <URow gap="sm">
                  <UButton
                          :label="t('button.applyFilters')"
                          @click="onApplyFilters"
                  />
                  <UButton
                          :label="t('button.clearFilters')"
                          variant="outlined"
                          @click="onClearFilters"
                  />
               </URow>
            </UCol>
         </UCol>
      </UCard>

      <!-- Search Results -->
      <URow gap="lg" align="start">
         <!-- Results List -->
         <UCol class="flex-1">
            <UCard v-if="searchResults.items.length">
               <template #header>
                  <URow justify="between" align="center">
                     <UText weight="medium">{{ t('title.searchResults') }}</UText>
                     <USelect
                             v-model="sortBy"
                             :options="sortOptions"
                             size="sm"
                             @change="onSortChange"
                     />
                  </URow>
               </template>

               <UDataList
                       :list="searchResults.items"
                       @click-item="onSelectResult"
               >
                  <template #item="{ item }">
                     <URow gap="md" align="start">
                        <UAvatar
                                :label="item.type"
                                :color="getTypeColor(item.type)"
                                size="md"
                        />
                        <UCol class="flex-1">
                           <UText weight="medium">{{ item.title }}</UText>
                           <UText size="sm" color="muted">{{ item.description }}</UText>
                           <URow gap="xs" class="mt-2">
                              <UBadge
                                      :label="item.type"
                                      size="sm"
                                      variant="soft"
                              />
                              <UText size="xs" color="muted">{{ formatDate(item.date) }}</UText>
                           </URow>
                        </UCol>
                        <UNumber
                                v-if="item.amount"
                                :value="item.amount"
                                :currency="item.currency"
                                size="sm"
                        />
                     </URow>
                  </template>
               </UDataList>

               <!-- Load More -->
               <template #footer>
                  <UButton
                          v-if="searchResults.hasMore"
                          :label="t('button.loadMore')"
                          variant="soft"
                          block
                          @click="onLoadMore"
                  />
               </template>
            </UCard>

            <!-- No Results -->
            <UCard v-else-if="hasSearched">
               <UCol align="center" gap="md" class="py-8">
                  <UIcon name="search_off" size="xl" color="muted" />
                  <UText color="muted">{{ t('message.noResults') }}</UText>
                  <UButton
                          :label="t('button.clearSearch')"
                          variant="outlined"
                          @click="onClearSearch"
                  />
               </UCol>
            </UCard>
         </UCol>

         <!-- Search Filters Sidebar -->
         <UCard class="w-80">
            <template #header>
               <UText weight="medium">{{ t('title.filters') }}</UText>
            </template>

            <UCol gap="md">
               <!-- Type Filter -->
               <UGroup :title="t('label.type')">
                  <UCheckboxGroup
                          v-model="filters.types"
                          :options="typeOptions"
                          @change="onFilterChange"
                  />
               </UGroup>

               <!-- Status Filter -->
               <UGroup :title="t('label.status')">
                  <URadioGroup
                          v-model="filters.status"
                          :options="statusOptions"
                          @change="onFilterChange"
                  />
               </UGroup>

               <!-- Amount Range -->
               <UGroup :title="t('label.amountRange')">
                  <UCol gap="sm">
                     <UInputNumber
                             v-model="filters.amountMin"
                             :placeholder="t('placeholder.min')"
                             size="sm"
                     />
                     <UInputNumber
                             v-model="filters.amountMax"
                             :placeholder="t('placeholder.max')"
                             size="sm"
                     />
                  </UCol>
               </UGroup>
            </UCol>
         </UCard>
      </URow>
   </UPage>
</template>
```

This comprehensive guide provides AI agents with practical examples and patterns for implementing Vueless UI components effectively in financial management and similar applications. The examples demonstrate real-world usage patterns, component combinations, and best practices for creating intuitive and functional user interfaces.
